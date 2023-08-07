import axios from "axios";

export default async function handler(req, res) {
    // let data = req.body;
    let data = {
        "brand_Logo": "",
        "aiName": "",
        "lastName": "Joja",
        "firstName": "Johnson",
        "brand_Url": "",
        "document": "This is a test document",
        "email": "me@emailme.com",
    }

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://hook.us1.make.com/dhc396xdwmrxbqo36n23rpnueehwclou',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        data: data
    };

    try {
        //Getting Conversational bot data
        const response = await axios.request(config);
        const botMessage = response.data;
        console.log(botMessage);

        //Mailsender setup


        //1. Webhook Endpoint: Set up a webhook endpoint in your application to 
        // receive incoming email responses. This endpoint will listen for incoming POST 
        // requests from MailerSend's inbound route when a recipient responds to an email.

        // 2. Identify Original Sender: In the incoming webhook data, you will receive information about the recipient's response. Within this data, you should be able to identify the original sender's email address, recipient's email address, and the content of the response.

        // 3. Process and Forward: Once you've identified the original sender's email address, you can use your application's logic to process the response. This could involve storing the response in a database, updating the conversation thread, or any other desired action.

        // 4. Forward the Response: After processing, use your email sending capabilities to forward the recipient's response back to the original sender's email address. This can be done by creating a new email using the MailerSend SDK or other email libraries, with the recipient's response content and the original sender's email address as the "To" field.

        // 5. Response Handling: Once the response is forwarded, you can optionally mark the conversation thread as replied, update the status in your application, or take any other action that suits your use case.








        //const Recipient = require("mailersend").Recipient;
        // const EmailParams = require("mailersend").EmailParams;
        // const MailerSend = require("mailersend");

        // const mailersend = new MailerSend({
        //     api_key: "key",
        // });

        // const recipients = [new Recipient("recipient@email.com", "Recipient")];

        // const emailParams = new EmailParams()
        //     .setFrom("your@email.com")
        //     .setFromName("Your Name")
        //     .setRecipients(recipients)
        //     .setSubject("Subject")
        //     .setHtml("Greetings from the team, you got this message through MailerSend.")
        //     .setText("Greetings from the team, you got this message through MailerSend.");

        // mailersend.send(emailParams);







    } catch (error) {
        console.log(error);
    }

    res.status(200).json({ name: 'John Doe' });
}
