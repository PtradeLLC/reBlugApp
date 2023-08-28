import { Client, Account } from 'appwrite';


export default async function handler(req, res) {
    const mailerSendUrl = "https://api.mailersend.com/v1/identities";
    const baseUrl = `${process.env.NEXT_PUBLIC_ENDPOINT}/users`;
    const appWrite_Key = process.env.NEXT_PUBLIC_CLIENT_APPWRITE_API_KEY;





    if (req.method === "POST") {
        //Create verification
        const { name, email } = req.body;
        const senderData = {
            "domain_id": `${process.env.NEXT_PUBLIC_DOMAIN_ID}`,
            "email": `${email}`,
            "name": `${name}`,
            "personal_note": `Hi ${name}, please confirm this email by clicking on the link below.`,
            "reply_to_name": "ForgedMart Support",
            "reply_to_email": "support@forgedmart.com",
            "add_note": true,
        };
        try {
            console.log(req.body);
            //Create new user
            // let users = new sdk.Users(client);
            // let promise = users.create(sdk.ID.unique(), 'email@gmaiil.com', undefined, 'password', 'Jane Doe');

            // const newUser = await promise;
            // console.log(newUser);






            //MAILSENDER CALL

            // const response = await fetch(mailerSendUrl, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         Authorization: `Bearer ${process.env.NEXT_PUBLIC_MAILERSEND_API_KEY}`
            //     },
            //     body: JSON.stringify(senderData)
            // });

            // if (response.ok) {
            //     res.status(200).json({ message: 'Success' });
            // } else {
            //     const responseData = await response.json();
            //     throw new Error(responseData.message || 'Failed to send data to MailerSend');
            // }
        } catch (error) {
            res.status(500).json({ message: error.message || 'Internal server error' });
        }
    }
}