import { PrismaClient } from "@prisma/client";
import { MailerSend } from "mailersend";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { email, provider } = req.body;

            if (email) {
                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                });

                if (!existingUser) {
                    // User doesn't exist, create a new one
                    await prisma.user.create({
                        data: {
                            email: email,
                        },
                    });

                    const sender = new MailerSend({
                        apiKey: process.env.MAILERSEND_API_KEY,
                    });

                    const redirectUrl = "https://forgedmart.com/dashboard"

                    const emailParams = {
                        to: [{ email: email }],
                        subject: "Confirmation Email",
                        text: `Hi, please confirm your email by clicking on the link below. ${redirectUrl}`,
                        "html": `<b> Hi, please confirm your email by clicking on the link: ${redirectUrl}</b>`,
                        from: {
                            name: "✨ForgedMart Support",
                            email: "support@forgedmart.com",
                        },
                    };


                    const response = await sender.email.send(emailParams);
                    console.log("Response", response);

                    if (response.status === 200) {
                        res.status(201).json({ message: "User Created" });

                    } else {
                        throw new Error(`Failed to send email. Status: ${response.status}`);
                    }
                } else {
                    res.status(200).json({ message: "User already exists" });
                }
            } else {
                res.status(400).json({ message: "Invalid request" });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message || "Internal server error" });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}







// import { PrismaClient } from "@prisma/client";
// import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//     if (req.method === "POST") {
//         // const session = await getServerSession(req, res, authOptions);
//         try {
//             const { email, provider } = req.body;
//             if (email) {
//                 // Check if the user already exists
//                 const existingUser = await prisma.user.findUnique({
//                     where: {
//                         email: email,
//                     },
//                 });

//                 if (existingUser) {
//                     res.status(200).json({ message: "User already exists" });
//                 }

//                 if (!existingUser) {
//                     // User doesn't exist, create a new one
//                     const newUser = await prisma.user.create({
//                         data: {
//                             email: email,
//                         }
//                     });
//                 }
//             }
//             if (provider) {
//                 if (provider.name === "Email") {
//                     const existingUser = await prisma.user.findUnique({
//                         where: {
//                             email: email,
//                         },
//                     });
//                 }
//                 if (!existingUser) {
//                     // User doesn't exist, create a new one
//                     const newUser = await prisma.user.create({
//                         data: {
//                             email: email,
//                         }
//                     });

//                     const sender = new MailerSend({
//                         apiKey: process.env.MAILERSEND_API_KEY,
//                     });

//                     const emailParams = {
//                         to: [{ email: email }],
//                         subject: "Confirmation Email",
//                         text: `Hi, please confirm your email by clicking on the link below. ${redirectUrl}`,
//                         "html": `<b> Hi, please confirm your email by clicking on the link: ${redirectUrl}</b>`,
//                         from: {
//                             name: "✨ForgedMart Support",
//                             email: "support@forgedmart.com",
//                         },
//                     };

//                     // const senderData = {
//                     //     "domain_id": `${process.env.NEXT_PUBLIC_DOMAIN_ID}`,
//                     //     "email": `${email}`,
//                     //     "name": `${email}`,
//                     //     "personal_note": `Hi, please confirm your email by clicking on the link below.`,
//                     //     "reply_to_name": "ForgedMart Support",
//                     //     "reply_to_email": "support@forgedmart.com",
//                     //     "html": `<b> Hi, please confirm your email by clicking on the link:</b>`,
//                     //     "add_note": true,
//                     //     "from": {
//                     //         "name": "✨ForgedMart Support",
//                     //         "email": "support@forgedmart.com",
//                     //     },
//                     // };

//                     const response = await sender.email.send(emailParams);


//                     // Create new user
//                     // const mailerSendUrl = "https://api.mailersend.com/v1/email"

//                     // // MAILSENDER CALL
//                     // const response = await fetch(mailerSendUrl, {
//                     //     method: "POST",
//                     //     headers: {
//                     //         'content-type': "application/json",
//                     //         Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`
//                     //     },
//                     //     body: JSON.stringify(senderData)
//                     // });

//                     if (response.ok) {
//                         res.status(201).json({ message: 'User Created' });
//                     } else {
//                         const responseData = await response.json();
//                         throw new Error(responseData.message || 'Failed to send data to MailerSend');
//                     }
//                 }
//             }

//             // const senderData = {
//             //     "domain_id": `${process.env.NEXT_PUBLIC_DOMAIN_ID}`,
//             //     "email": `${email}`,
//             //     "name": `${data}`,
//             //     "personal_note": `Hi ${data}, please confirm this email by clicking on the link below.`,
//             //     "reply_to_name": "ForgedMart Support",
//             //     "reply_to_email": "support@forgedmart.com",
//             //     "add_note": true,
//             // };
//             //Create new user

//             // MAILSENDER CALL
//             // const response = await fetch(mailerSendUrl, {
//             //     method: "POST",
//             //     headers: {
//             //         "Content-Type": "application/json",
//             //         Authorization: `Bearer ${process.env.NEXT_PUBLIC_MAILERSEND_API_KEY}`
//             //     },
//             //     body: JSON.stringify(senderData)
//             // });

//             // if (response.ok) {
//             //     res.status(201).json({ message: 'User Created' });
//             // } else {
//             //     const responseData = await response.json();
//             //     throw new Error(responseData.message || 'Failed to send data to MailerSend');
//             // }
//             res.status(200).json({ success: email || provider });
//         } catch (error) {
//             res.status(500).json({ success: false, message: error.message || 'Internal server error' });
//         }
//     }
// }








































