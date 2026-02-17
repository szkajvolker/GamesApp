import dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

const escapeHtml = (str) => {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const resend = new Resend(process.env.RESEND_API_KEY);

const FEEDBACK_EMAIL = process.env.FEEDBACK_EMAIL;

export const sendFeedback = async (req, res) => {
  try {
    const { subject, message, type } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const safeType = escapeHtml(type);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    await resend.emails.send({
      from: "feedback@resend.dev",
      to: [FEEDBACK_EMAIL],
      subject: `${safeType || "Feedback"} : ${safeSubject || "GameStore Feedback"}`,
      html: `
      <h2>New ${safeType || "feedback"} arrived</h2>
      <p><strong>From:</strong> Anonymous User</p>
      <p><strong>Type:</strong> ${safeType || "Normal feedback"}</p>
      <p><strong>Subject:</strong> ${safeSubject || "No subject"}</p>
      <p><strong>Message:</strong></p>
      <div style="background: #f5f5f5; padding: 15px; border-radius:5px;">
      ${safeMessage.replace(/\n/g, "<br>")}
      </div>
      <p style="color: #666; font-size: 12px; margin-top: 20px;">
      Time: ${new Date().toLocaleString("hu-HU")}
      </p> 
      `,
    });

    res.status(200).json({
      success: true,
      message: "Feedback successfully sent!",
    });
  } catch (error) {
    console.error("Feedback email error: ", error);
    res.status(500).json({
      success: false,
      message: "Error while sending email",
    });
  }
};
