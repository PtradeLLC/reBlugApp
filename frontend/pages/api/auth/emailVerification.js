import { MailerSend } from "mailersend";

async function sendVerificationEmail(identifier, url, token, provider) {
    // Use your email provider to send the verification email
    // Replace the placeholders with your actual email sending code
    const emailContent = `
      Click the following link to verify your email address:
      ${url}
    `;

    await MailerSend.sendEmail({
        to: identifier,
        subject: "Verify your email address",
        html: emailContent,
    });
}

export default sendVerificationEmail;
