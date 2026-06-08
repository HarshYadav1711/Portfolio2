import { NextRequest, NextResponse } from "next/server";
import {
  checkContactRateLimit,
} from "@/lib/contact-rate-limit";
import {
  logContactDelivered,
  logContactDeliveryFailure,
  logContactEvent,
} from "@/lib/contact-log";
import {
  CONTACT_LIMITS,
  escapeHtml,
  parseContactInput,
} from "@/lib/contact-validation";

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL);
}

export async function POST(request: NextRequest) {
  try {
    const contentLength = request.headers.get("content-length");
    if (
      contentLength &&
      Number.parseInt(contentLength, 10) > CONTACT_LIMITS.bodyMaxBytes
    ) {
      return NextResponse.json(
        { error: "Request body is too large." },
        { status: 413 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body. Please ensure all fields are provided." },
        { status: 400 }
      );
    }

    const parsed = parseContactInput(body);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const { name, email, message } = parsed.data;
    const clientIp = getClientIp(request);
    const rateLimit = checkContactRateLimit(clientIp, email);

    if (!rateLimit.allowed) {
      logContactEvent("rate_limited", { ip: clientIp });
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: rateLimit.retryAfterSeconds
            ? { "Retry-After": String(rateLimit.retryAfterSeconds) }
            : undefined,
        }
      );
    }

    if (!isEmailConfigured()) {
      logContactEvent("not_configured");
      return NextResponse.json(
        {
          error:
            "Message delivery is temporarily unavailable. Please try again later or use the email link below.",
        },
        { status: 503 }
      );
    }

    let Resend;
    try {
      const resendModule = await import("resend");
      Resend = resendModule.Resend;
    } catch {
      logContactDeliveryFailure("resend_package_unavailable");
      return NextResponse.json(
        { error: "We could not deliver your message. Please try again later." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!contactEmail) {
      logContactEvent("not_configured");
      return NextResponse.json(
        {
          error:
            "Message delivery is temporarily unavailable. Please try again later or use the email link below.",
        },
        { status: 503 }
      );
    }

    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedMessage = escapeHtml(message).replace(/\n/g, "<br>");

    const textVersion = `New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}

---
This message was sent from your portfolio contact form.`;

    const emailPayload = {
      from: fromEmail,
      to: contactEmail,
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      text: textVersion,
      html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 10px 0;"><strong style="color: #555;">Name:</strong> ${escapedName}</p>
                <p style="margin: 10px 0;"><strong style="color: #555;">Email:</strong> <a href="mailto:${escapedEmail}" style="color: #007bff;">${escapedEmail}</a></p>
                <p style="margin: 10px 0;"><strong style="color: #555;">Message:</strong></p>
                <div style="background: white; padding: 15px; border-left: 4px solid #007bff; margin-top: 10px;">
                  <p style="margin: 0; white-space: pre-wrap; color: #333;">${escapedMessage}</p>
                </div>
              </div>
              <p style="color: #888; font-size: 12px; margin-top: 20px;">
                This message was sent from your portfolio contact form.
              </p>
            </div>
          `,
    };

    const result = await resend.emails.send(emailPayload);

    if (result.error) {
      const reason =
        typeof result.error.message === "string"
          ? result.error.message
          : "resend_api_error";
      logContactDeliveryFailure(reason);
      return NextResponse.json(
        { error: "We could not deliver your message. Please try again later." },
        { status: 502 }
      );
    }

    const emailId = result.data?.id;
    if (!emailId || typeof emailId !== "string") {
      logContactDeliveryFailure("missing_delivery_id");
      return NextResponse.json(
        { error: "We could not deliver your message. Please try again later." },
        { status: 502 }
      );
    }

    logContactDelivered(emailId, email);

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    logContactEvent("request_error", {
      reason: error instanceof Error ? error.name : "unknown_error",
    });
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
