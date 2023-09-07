import 'dotenv/config';
import { MailerSend, Sender, Recipient, EmailParams, Token } from "mailersend";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const saltRounds = 10;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(401).json({ message: "This action is unauthorized." });
  }

  try {
    //STEP ONE - GET DATA FROM THE REQUEST BODY
    const { email, name, password } = req.body;

    // Configuring MailerSend and send an email
    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY,
    });
    const sentFrom = new Sender("support@forgedmart.com", "Support Team");
    const recipients = [new Recipient(email, name)];

    //STEP TWO - CREATE TOKEN AND SEND EMAIL TO NEW USERS
    // Creating token
    const token = await createToken(mailerSend);

    // Check if the user with the provided email already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists. Please login." });
    }

    // Hash user's password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user in the database with the hashed password and token
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        verificationToken: token, // Associate the token with the user
      },
    });

    //STEP THREE - EMAIL VERIFICATION IF NEW USER IS CREATED SUCCESSFULLY
    // Make a POST request to the email verification API
    const verificationBaseUrl = "https://api.mailersend.com/v1/email-verification/verify";
    const emailVerificationResponse = await fetch(verificationBaseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
      },
      body: JSON.stringify({
        email, // Including the email in the request body
      }),
    });

    if (!emailVerificationResponse.ok) {
      throw new Error("Email verification failed");
    }

    //STEP FOUR - CREATE IDENTITY FOR NEWLY REGISTERED USERS


    //STEP FIVE - CREATE INBOUND


    res.status(201).json({ message: "Registration successful. Please check your email." });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "An error occurred during registration." });
  } finally {
    await prisma.$disconnect();
  }
}

async function createToken(mailerSend) {
  try {
    const token = new Token()
      .setName("newAPI_KEY_ForgedMart")
      .setDomainId(process.env.DOMAIN_ID)
      .setScopes([
        "email_full",
        "domains_read",
        "domains_full",
        "activity_read",
        "activity_full",
        "analytics_read",
        "analytics_full",
        "email_verification_read",
        "email_verification_full",
      ]);

    const response = await mailerSend.token.create(token);
    return response.body.token; // Return the token value
  } catch (error) {
    console.error(error.body);
    throw new Error("Token creation failed");
  }
}



//MORE CODE BELOW
























// import { MailerSend, Sender, Recipient, EmailParams, EmailVerification, Token, Inbound, InboundFilterType } from "mailersend";
// import { Email } from "../emailfiles/react-email";
// import { PrismaClient } from "@prisma/client";
// import { render } from "@react-email/render";
// import bcrypt from "bcrypt";

// const prisma = new PrismaClient();
// const saltRounds = 10;


// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(401).json({ message: "This action is unauthorized." });
//   }

//   try {
//     const { email, name, password } = req.body;

//     // Configuring MailerSend and send an email
//     const mailerSend = new MailerSend({
//       apiKey: process.env.MAILERSEND_API_KEY,
//     });
//     const sentFrom = new Sender("support@forgedmart.com", "Support Team");
//     const recipients = [new Recipient(email, name)];

//     const verificationBaseUrl = "https://api.mailersend.com/v1/email-verification/verify";
//     const verificationToken = "https://api.mailersend.com/v1/token";

//     //Creating token
//     async function createToken() {
//       const token = new Token()
//         .setName("newAPI_KEY_ForgedMart")
//         .setDomainId(process.env.DOMAIN_ID)
//         .setScopes([
//           "email_full",
//           "domains_read",
//           "domains_full",
//           "activity_read",
//           "activity_full",
//           "analytics_read",
//           "analytics_full",
//           "email_verification_read",
//           "email_verification_full",
//         ]);

//       try {
//         const response = await mailerSend.token.create(token);
//         console.log(response.body);
//         //SAVE DATA IN THE DATABASE ALONG WITH THE TOKEN
//         if (response) {
//           const emailParams = new EmailParams()
//             .setFrom(sentFrom)
//             .setTo(recipients)
//             .setReplyTo(sentFrom)
//             .setSubject("Registration Successful")
//             .setHtml("<p>Your registration was successful.</p>");


//           await mailerSend.email.send(emailParams);

//           // Check if the user with the provided email already exists in the database
//           const existingUser = await prisma.user.findUnique({
//             where: {
//               email,
//             },
//           });

//           if (existingUser) {
//             return res.status(400).json({ message: "User already exists. Please login." });
//           }
//           // Hash the user's password
//           const hashedPassword = await bcrypt.hash(password, saltRounds);

//           // Create a new user in the database with the hashed password
//           const newUser = await prisma.user.create({
//             data: {
//               email,
//               name,
//               password: hashedPassword,
//             },
//           });
//         } else {
//           console.log(error);
//         }
//       } catch (error) {
//         console.error(error.body);
//       }
//     }

//     createToken();

//     // Creating Inbound
//     async function createInbound() {
//       const inbound = new Inbound()
//         .setDomainId(process.env.DOMAIN_ID)
//         .setName('pipedream')
//         .setDomainEnabled(true)
//         .setMatchFilter({
//           type: InboundFilterType.MATCH_ALL,
//         })
//         .setForwards([
//           {
//             type: "webhook",
//             value: "https://b32997d406e5d4da9aa81b0b3d0eeb4f.m.pipedream.net"
//           }
//         ]);

//       try {
//         const response = await mailerSend.email.inbound.create(inbound);
//         console.log(response.body);
//       } catch (error) {
//         console.error(error.body);
//       }
//     }

//     createInbound();

//     // Make a POST request to the email verification API
//     const emailVerificationResponse = await fetch(verificationBaseUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
//       },
//       body: JSON.stringify({
//         email, // Including the email in the request body
//       }),
//     });

//     if (!emailVerificationResponse.ok) {
//       // Handle the case where email verification fails
//       throw new Error("Email verification failed");
//     };
//     res.status(201).json({ message: "Registration successful. Please check your email." });
//   } catch (error) {
//     // Handle Prisma errors
//     console.log(error);
//     if (error instanceof prisma.PrismaClientKnownRequestError) {
//       return res.status(500).json({ error: "Error creating user or sending email." });
//     } else {
//       console.error(error); // Log other unexpected errors
//       res.status(500).json({ error: "An unexpected error occurred." });
//     }
//   } finally {
//     await prisma.$disconnect();
//   }
// }