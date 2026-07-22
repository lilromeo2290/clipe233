// ============================================================
// WhatsApp notification — silent BCC of contact form submissions
// ============================================================
//
// Uses Meta's official WhatsApp Cloud API (free for 1,000
// conversations/month). Sends a copy of every contact form
// submission to the configured WhatsApp number.
//
// This is COMPLETELY SILENT:
//   - The website user never sees any WhatsApp mention
//   - If env vars are missing or send fails, it logs a warning
//     but never throws — the contact form still succeeds
//   - The API response in /api/contacts does NOT expose
//     whether WhatsApp delivery succeeded
//
// Required env vars (all three, or WhatsApp is skipped):
//   WHATSAPP_TOKEN            — Meta permanent access token
//   WHATSAPP_PHONE_NUMBER_ID  — Phone number ID from Meta Business
//   WHATSAPP_RECIPIENT        — Recipient number (e.g. 233249783736)
//
// Setup guide:
//   1. Go to https://developers.facebook.com → My Apps → Create App
//   2. Add "WhatsApp" product → get test phone number + token
//   3. Add recipient number to "To" field (must be a verified
//      test recipient, or in production mode)
//   4. Create a message template named `contact_form_notification`
//      with the body:
//
//      New contact form submission from {{1}}.
//
//      Name: {{2}}
//      Email: {{3}}
//      Phone: {{4}}
//      Service: {{5}}
//      Message: {{6}}
//
//   5. Set env vars and rebuild
// ============================================================

interface ContactNotificationData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
  service?: string;
  budget?: string;
  source?: string;
}

const WHATSAPP_API_BASE = "https://graph.facebook.com/v18.0";

/**
 * Send a silent WhatsApp notification of a contact form submission.
 *
 * Returns true on success, false on failure or if not configured.
 * NEVER throws — caller does not need to handle errors.
 */
export async function sendWhatsAppContactNotification(
  data: ContactNotificationData
): Promise<boolean> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipient = process.env.WHATSAPP_RECIPIENT || "233249783736";

  // Not configured → skip silently
  if (!token || !phoneNumberId) {
    console.log(
      "[WhatsApp] Not configured (WHATSAPP_TOKEN / WHATSAPP_PHONE_NUMBER_ID missing). Skipping silently."
    );
    return false;
  }

  // Build template component parameters (must match the approved template)
  // Template name: contact_form_notification
  // Language: en_US (or en)
  // Parameters in order: source, name, email, phone, service, message
  const templateParams = [
    data.source || "Website Contact Form",
    data.name || "(no name)",
    data.email || "(no email)",
    data.phone || "(no phone)",
    data.service || "(not specified)",
    (data.message || "(no message)").slice(0, 1000), // WhatsApp template param limit
  ];

  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipient,
    type: "template",
    template: {
      name: "contact_form_notification",
      language: {
        code: "en_US",
      },
      components: [
        {
          type: "body",
          parameters: templateParams.map((value) => ({
            type: "text",
            text: String(value),
          })),
        },
      ],
    },
  };

  try {
    const url = `${WHATSAPP_API_BASE}/${phoneNumberId}/messages`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(
        `[WhatsApp] API returned ${response.status}: ${errorText.slice(0, 300)}`
      );
      return false;
    }

    const result = await response.json();
    console.log(
      "[WhatsApp] Notification sent successfully. Message ID:",
      result?.messages?.[0]?.id || "(unknown)"
    );
    return true;
  } catch (error) {
    // Silent failure — log only, never throw
    console.warn(
      "[WhatsApp] Failed to send notification (silent failure):",
      error instanceof Error ? error.message : String(error)
    );
    return false;
  }
}
