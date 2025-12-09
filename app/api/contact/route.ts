import { NextRequest, NextResponse } from 'next/server';

// This API route handles contact form submissions
// You can configure it to send emails using various services:
// - Resend (recommended): https://resend.com
// - SendGrid: https://sendgrid.com
// - Nodemailer with SMTP
// - Or integrate with Formspree, EmailJS, etc.

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid request body. Please ensure all fields are provided.' },
        { status: 400 }
      );
    }

    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // ============================================
    // EMAIL SENDING IMPLEMENTATION
    // ============================================
    // Try to send email using Resend (if configured)
    // If Resend is not configured, the message will be logged
    let emailSent = false;
    let emailErrorDetails: string | null = null;
    
    // Debug: Check environment variables (without exposing sensitive data)
    const hasApiKey = !!process.env.RESEND_API_KEY;
    const hasContactEmail = !!process.env.CONTACT_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
    
    console.log('📧 Email Configuration Check:', {
      hasApiKey,
      hasContactEmail,
      fromEmail,
      contactEmail: hasContactEmail ? process.env.CONTACT_EMAIL : 'NOT SET',
      apiKeyPrefix: hasApiKey ? process.env.RESEND_API_KEY?.substring(0, 5) + '...' : 'NOT SET',
    });
    
    if (hasApiKey && hasContactEmail) {
      try {
        // Dynamic import to avoid errors if resend is not installed
        let Resend;
        try {
          const resendModule = await import('resend');
          Resend = resendModule.Resend;
        } catch (importError) {
          console.error('❌ Resend package not installed. Install it with: npm install resend');
          throw new Error('Resend package not available');
        }
        
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        // Escape HTML to prevent XSS and ensure proper rendering
        const escapeHtml = (text: string) => {
          const map: { [key: string]: string } = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
          };
          return text.replace(/[&<>"']/g, (m) => map[m]);
        };

        const escapedName = escapeHtml(name);
        const escapedEmail = escapeHtml(email);
        const escapedMessage = escapeHtml(message).replace(/\n/g, '<br>');

        // Ensure CONTACT_EMAIL is defined (TypeScript safety)
        const contactEmail = process.env.CONTACT_EMAIL;
        if (!contactEmail) {
          throw new Error('CONTACT_EMAIL is not set');
        }

        // Create plain text version for better email client compatibility
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

        console.log('📤 Attempting to send email via Resend...', {
          to: contactEmail,
          from: fromEmail,
          subject: emailPayload.subject,
        });

        const result = await resend.emails.send(emailPayload);
        
        // Log the full response for debugging
        console.log('📨 Full Resend API response:', JSON.stringify(result, null, 2));
        
        // Check if Resend returned an error in the response
        if (result.error) {
          emailErrorDetails = `Resend API error: ${JSON.stringify(result.error)}`;
          console.error('❌ Resend API returned an error:', result.error);
          throw new Error(emailErrorDetails);
        }
        
        // Check if we got a valid response with an id
        if (result.data && result.data.id) {
          emailSent = true;
          console.log('✅ Email sent successfully via Resend!', {
            emailId: result.data.id,
            to: contactEmail,
          });
        } else {
          // Log the full result to help debug
          emailErrorDetails = `Resend returned an unexpected response format. Full response: ${JSON.stringify(result)}`;
          console.error('❌ Unexpected Resend response format:', result);
          console.error('❌ Response type:', typeof result);
          console.error('❌ Response keys:', Object.keys(result || {}));
          throw new Error(emailErrorDetails);
        }
      } catch (emailError: any) {
        emailErrorDetails = emailError.message || String(emailError);
        
        // Check for specific Resend error types
        if (emailError.response) {
          console.error('❌ Resend HTTP Error Response:', {
            status: emailError.response?.status,
            statusText: emailError.response?.statusText,
            data: emailError.response?.data,
          });
          emailErrorDetails = `Resend HTTP Error: ${emailError.response?.status} - ${JSON.stringify(emailError.response?.data || emailError.message)}`;
        } else if (emailError.message) {
          console.error('❌ Resend Error Message:', emailError.message);
        }
        
        console.error('❌ Full error details:', {
          error: emailErrorDetails,
          message: emailError.message,
          stack: emailError.stack,
          name: emailError.name,
          code: emailError.code,
          type: typeof emailError,
          keys: Object.keys(emailError || {}),
        });
        // Continue to log the message even if email fails
      }
    } else {
      emailErrorDetails = !hasApiKey 
        ? 'RESEND_API_KEY is not set in environment variables'
        : 'CONTACT_EMAIL is not set in environment variables';
      console.warn('⚠️  Email service not configured:', emailErrorDetails);
    }

    // Log the message (always done for backup/debugging)
    console.log('📝 Contact form submission:', {
      name,
      email,
      messageLength: message.length,
      emailSent,
      emailError: emailErrorDetails,
      timestamp: new Date().toISOString(),
    });

    // If email service is not configured or failed, log detailed information
    if (!emailSent) {
      if (emailErrorDetails) {
        console.error('⚠️  Email sending failed:', emailErrorDetails);
      } else if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
        console.warn(
          '⚠️  Email service not configured. Messages are being logged only.\n' +
          'To enable email notifications, set RESEND_API_KEY and CONTACT_EMAIL in your .env.local file.\n' +
          'Get a free API key at: https://resend.com'
        );
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been sent successfully!' 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

