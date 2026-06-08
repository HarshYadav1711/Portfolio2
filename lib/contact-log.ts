type ContactLogEvent =
  | "validated"
  | "rate_limited"
  | "delivered"
  | "delivery_failed"
  | "not_configured"
  | "request_error";

function redactEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) {
    return "[invalid-email]";
  }
  const visible = local.slice(0, 1);
  return `${visible}***@${domain}`;
}

export function logContactEvent(
  event: ContactLogEvent,
  details: Record<string, string | number | boolean | undefined> = {}
): void {
  const payload = Object.entries(details)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join(" ");

  const message = payload ? `contact:${event} ${payload}` : `contact:${event}`;

  if (event === "delivered") {
    console.info(message);
    return;
  }

  if (event === "validated") {
    return;
  }

  if (event === "rate_limited") {
    console.warn(message);
    return;
  }

  console.error(message);
}

export function logContactDeliveryFailure(reason: string): void {
  logContactEvent("delivery_failed", { reason });
}

export function logContactDelivered(emailId: string, email: string): void {
  logContactEvent("delivered", {
    id: emailId,
    sender: redactEmail(email),
  });
}
