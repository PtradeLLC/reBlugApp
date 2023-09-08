export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { data } = req.body;
            console.log(data);
            const senderData = {
                "domain_id": `${process.env.NEXT_PUBLIC_DOMAIN_ID}`,
                "email": `${email}`,
                "name": `${data}`,
                "personal_note": `Hi ${data}, please confirm this email by clicking on the link below.`,
                "reply_to_name": "ForgedMart Support",
                "reply_to_email": "support@forgedmart.com",
                "add_note": true,
            };
            //Create new user

            // MAILSENDER CALL
            const response = await fetch(mailerSendUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MAILERSEND_API_KEY}`
                },
                body: JSON.stringify(senderData)
            });

            if (response.ok) {
                res.status(200).json({ message: 'Success' });
            } else {
                const responseData = await response.json();
                throw new Error(responseData.message || 'Failed to send data to MailerSend');
            }
            res.status(200).json({ success: "user created" })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message || 'Internal server error' });
        }
    }
}
