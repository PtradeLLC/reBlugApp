import 'dotenv/config';
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';
import { authOptions } from "next-auth";
import { getServerSession } from "next-auth";
import { withAccelerate } from '@prisma/extension-accelerate'

const saltRounds = 10;

const globalForPrisma = global;

export const prisma =
  (globalForPrisma.prisma ||
    new PrismaClient({
      log: ['query'],
    }).$extends(withAccelerate()));

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default async function handler(req, res) {
  // const session = await getServerSession(authOptions)
  if (req.method !== "POST") {
    return res.status(401).json({ message: "This action is unauthorized." });
  }

  if (req.method === "POST") {
    console.log(session);
    try {
      const { brandName, firstName, lastName, email, password, provider } = req.body;

      if (!brandName || !firstName || !lastName || !email || !password || !provider) {
        console.error("Validation error: Brand name, first name, last name, or email is missing");
        return res.status(400).json({ message: "An entry is missing" });
      };

      // const sentFrom = new Sender("support@forgedmart.com", "Support Team");

      // Check if the user with the provided email already exists in the database
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
        cacheStrategy: { ttl: 60 },
      });


      if (existingUser) {
        return res.status(409).json({ user: null, message: "User already exists, please login." });
      }


      // Hash user's password
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const verificationBaseUrl = "";

      const newUser = await prisma.user.create({
        data: {
          brandName,
          email,
          firstName,
          lastName,
          provider,
          password: hashedPassword,
        },
        cacheStrategy: { ttl: 60 },
      });

      const { password: newUserPassword, ...rest } = newUser;

      // const emailVerificationResponse = await fetch(verificationBaseUrl, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token} `,
      //   },
      //   body: JSON.stringify({
      //     email, // Including the email in the request body
      //   }),
      // });

      // if (!emailVerificationResponse.ok) {
      //   throw new Error("Email verification failed");
      // };

      res.status(201).json({ user: rest, message: "User created successfully. Please check your email to verify." });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: `An error occurred during registration :${error}` });
    } finally {
      await prisma.$disconnect();
    }
  }
}