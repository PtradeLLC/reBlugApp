// import { MailerSend, Identity } from "mailersend";

export default async function handler(req, res) {
    // const mailerSendUrl = "https://api.mailersend.com/v1/identities";

    // const mailerSend = new MailerSend({
    //     apiKey: process.env.MAILERSEND_API_KEY,
    // });

    if (req.method === "POST") {
        const { firstName, lastName, email } = req.body;
        try {
            response = console.log(Hello);
            if (!response) {
                throw new Error(`There is no response ${response.statusText}`);
            }
            res.status(200).json({ message: "Success" });
        } catch (error) {
            res.status(500).json({ message: error.message || 'Internal server error' });
        }
    }
}