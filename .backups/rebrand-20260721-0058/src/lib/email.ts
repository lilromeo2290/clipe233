import nodemailer from "nodemailer";

// Email configuration
const EMAIL_CONFIG = {
  from: process.env.EMAIL_FROM || "clipe233eng@gmail.com",
  to: process.env.EMAIL_TO || "clipe233eng@gmail.com, info@clipe233eng.net",
};

// Create reusable transporter
function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER || "",
      pass: process.env.EMAIL_PASSWORD || "",
    },
  });
}

// Verify transporter connection
export async function verifyEmailConfig(): Promise<boolean> {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn("[Email] EMAIL_USER or EMAIL_PASSWORD not set in .env — email sending is disabled.");
      return false;
    }
    const transporter = createTransporter();
    await transporter.verify();
    console.log("[Email] SMTP connection verified successfully.");
    return true;
  } catch (error) {
    console.error("[Email] SMTP verification failed:", error);
    return false;
  }
}

interface ContactFormData {
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

// Send contact form notification email
export async function sendContactEmail(formData: ContactFormData): Promise<boolean> {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn("[Email] Email credentials not configured. Skipping email send.");
      console.log("[Email] Contact form submission:", formData);
      return false;
    }

    const transporter = createTransporter();

    const subjectLine = formData.subject
      ? `Website Contact: ${formData.subject}`
      : `New Contact Form Submission from ${formData.name}`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #7B1818; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Clipe233 Engineers Website</p>
        </div>
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #333; width: 140px; border-bottom: 1px solid #f0f0f0;">Name:</td>
              <td style="padding: 10px 0; color: #555; border-bottom: 1px solid #f0f0f0;">${formData.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #333; border-bottom: 1px solid #f0f0f0;">Email:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                <a href="mailto:${formData.email}" style="color: #7B1818;">${formData.email}</a>
              </td>
            </tr>
            ${formData.phone ? `
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #333; border-bottom: 1px solid #f0f0f0;">Phone:</td>
              <td style="padding: 10px 0; color: #555; border-bottom: 1px solid #f0f0f0;">
                <a href="tel:${formData.phone}" style="color: #7B1818;">${formData.phone}</a>
              </td>
            </tr>` : ""}
            ${formData.company ? `
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #333; border-bottom: 1px solid #f0f0f0;">Company:</td>
              <td style="padding: 10px 0; color: #555; border-bottom: 1px solid #f0f0f0;">${formData.company}</td>
            </tr>` : ""}
            ${formData.service ? `
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #333; border-bottom: 1px solid #f0f0f0;">Service Interest:</td>
              <td style="padding: 10px 0; color: #555; border-bottom: 1px solid #f0f0f0;">${formData.service}</td>
            </tr>` : ""}
            ${formData.budget ? `
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #333; border-bottom: 1px solid #f0f0f0;">Budget:</td>
              <td style="padding: 10px 0; color: #555; border-bottom: 1px solid #f0f0f0;">${formData.budget}</td>
            </tr>` : ""}
            ${formData.subject ? `
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #333; border-bottom: 1px solid #f0f0f0;">Subject:</td>
              <td style="padding: 10px 0; color: #555; border-bottom: 1px solid #f0f0f0;">${formData.subject}</td>
            </tr>` : ""}
            ${formData.message ? `
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #333; vertical-align: top;">Message:</td>
              <td style="padding: 10px 0; color: #555; line-height: 1.6;">${formData.message.replace(/\n/g, "<br>")}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #333;">Source:</td>
              <td style="padding: 10px 0; color: #555;">${formData.source || "Website Contact Form"}</td>
            </tr>
          </table>
          <div style="margin-top: 25px; padding: 15px; background-color: #fef3f3; border-left: 4px solid #7B1818; border-radius: 4px;">
            <p style="margin: 0; color: #7B1818; font-size: 14px;">
              <strong>Reply to this inquiry:</strong> 
              <a href="mailto:${formData.email}" style="color: #7B1818; font-weight: bold;">${formData.email}</a>
              ${formData.phone ? ` | <a href="tel:${formData.phone}" style="color: #7B1818; font-weight: bold;">${formData.phone}</a>` : ""}
            </p>
          </div>
        </div>
        <div style="text-align: center; padding: 15px; color: #999; font-size: 12px;">
          This email was sent from the Clipe233 Engineers website contact form.
        </div>
      </div>
    `;

    const textBody = `
New Contact Form Submission - Clipe233 Engineers

Name: ${formData.name}
Email: ${formData.email}
${formData.phone ? `Phone: ${formData.phone}` : ""}
${formData.company ? `Company: ${formData.company}` : ""}
${formData.service ? `Service Interest: ${formData.service}` : ""}
${formData.budget ? `Budget: ${formData.budget}` : ""}
${formData.subject ? `Subject: ${formData.subject}` : ""}
${formData.message ? `Message: ${formData.message}` : ""}
Source: ${formData.source || "Website Contact Form"}

Reply to: ${formData.email}${formData.phone ? ` | ${formData.phone}` : ""}
    `.trim();

    const info = await transporter.sendMail({
      from: `"Clipe233 Engineers Website" <${EMAIL_CONFIG.from}>`,
      to: EMAIL_CONFIG.to,
      replyTo: formData.email,
      subject: subjectLine,
      text: textBody,
      html: htmlBody,
    });

    console.log("[Email] Message sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send contact email:", error);
    return false;
  }
}

// Send auto-reply to the person who submitted the contact form
export async function sendAutoReply(formData: ContactFormData): Promise<boolean> {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      return false;
    }

    const transporter = createTransporter();

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #7B1818; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 22px;">Thank You for Contacting Us!</h1>
        </div>
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: none;">
          <p style="color: #333; font-size: 16px;">Dear ${formData.name},</p>
          <p style="color: #555; line-height: 1.6;">
            Thank you for reaching out to Clipe233 Engineers. We have received your message and our team will get back to you within 24-48 hours.
          </p>
          <p style="color: #555; line-height: 1.6;">
            If your inquiry is urgent, please feel free to call us directly or reach us on WhatsApp.
          </p>
          <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 4px;">
            <p style="margin: 5px 0; color: #333;"><strong>Email:</strong> <a href="mailto:info@clipe233eng.net" style="color: #7B1818;">info@clipe233eng.net</a> / <a href="mailto:clipe233eng@gmail.com" style="color: #7B1818;">clipe233eng@gmail.com</a></p>
            <p style="margin: 5px 0; color: #333;"><strong>WhatsApp:</strong> <a href="https://wa.me/233249783736" style="color: #7B1818;">+233 249 783 736</a></p>
            <p style="margin: 5px 0; color: #333;"><strong>Phone:</strong> <a href="tel:+233535399562" style="color: #7B1818;">053 539 9562</a></p>
          </div>
          <p style="color: #555; line-height: 1.6;">
            We look forward to working with you!
          </p>
          <p style="color: #333; margin-top: 25px;">
            Best regards,<br>
            <strong style="color: #7B1818;">Clipe233 Engineers</strong><br>
            <span style="color: #888; font-size: 13px;">IT & Engineering Solutions</span>
          </p>
        </div>
        <div style="text-align: center; padding: 15px; color: #999; font-size: 12px;">
          This is an automated message from Clipe233 Engineers.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Clipe233 Engineers" <${EMAIL_CONFIG.from}>`,
      to: formData.email,
      subject: "We've Received Your Message - Clipe233 Engineers",
      text: `Dear ${formData.name},\n\nThank you for reaching out to Clipe233 Engineers. We have received your message and our team will get back to you within 24-48 hours.\n\nIf your inquiry is urgent, please contact us:\nEmail: info@clipe233eng.net / clipe233eng@gmail.com\nWhatsApp: +233 249 783 736\nPhone: 053 539 9562\n\nWe look forward to working with you!\n\nBest regards,\nClipe233 Engineers\nIT & Engineering Solutions`,
      html: htmlBody,
    });

    console.log("[Email] Auto-reply sent to:", formData.email);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send auto-reply:", error);
    return false;
  }
}
