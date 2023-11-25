import SendNewEmail from "./newUser";


async function sendVerificationEmail(email, firstName, verificationLink) {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        body: JSON.stringify({
            to: email,
            subject: "Verify Your Account",
            html: SendNewEmail({ firstName, verificationLink }),
        }),
        headers: {
            Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
            "Content-Type": "application/json",
        },
        method: "POST",
    });

    return response;
}

export default sendVerificationEmail;