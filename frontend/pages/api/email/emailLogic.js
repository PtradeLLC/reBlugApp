import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { Email } from "../emailfiles/react-email";
import { PrismaClient } from "@prisma/client";
import { render } from "@react-email/render";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ message: "Success!" });
  }

  // configure inbound route on mailersend with: https://forgedmart.com/inbound (Secret: 8lcskb1tZ8FssDKmxBIr0Ti4kLzYXddj)
  //  cprycw6mcruubg9otnkp@inbound.mailersend.net

  if (req.method === "POST") {
    const { email, firstName, lastName, brand_url, logo, email_body, data } =
      req.body;

    try {
      const mailerSend = new MailerSend({
        apiKey: process.env.MAILERSEND_API_KEY,
      });

      // const emailHtml = render(
      //   <Email
      //     email={email}
      //     firstName={firstName}
      //     lastName={lastName}
      //     logo={logo}
      //     brand_url={brand_url}
      //     email_body={email_body}
      //     data={data}
      //   />,
      //   { pretty: true }
      // );

      const sentFrom = new Sender("support@forgedmart.com", "John Wayne");
      const recipients = [new Recipient(email, `${firstName} ${lastName}`)];

      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject("This is a Subject");
      // .setHtml(emailHtml);

      await mailerSend.email.send(emailParams);

      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Error sending email ${error}` });
    }
  }
}
