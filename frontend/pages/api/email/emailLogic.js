import 'dotenv/config';
import bcrypt from "bcrypt";
import { randomUUID } from 'crypto';
import SendNewEmail from './newUser';
import prisma from "../../../lib/db";
const saltRounds = 12;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userType, brandName, firstName, lastName, email, password, provider } = req.body;

      if (!email || !password || !firstName || !lastName || provider === '' || userType === '') {
        console.error("Validation error: signup form is missing a field", req.body);
        return res.status(400).json({ message: "An entry is missing" });
      }

      const lowercaseEmail = email.toLowerCase();

      // if User already exists (including unverified emails)
      const existingUser = await prisma.user.findFirst({
        where: {
          email: lowercaseEmail,
          OR: [
            { isVerified: true },
            { verificationTokens: { some: { activatedAt: null } } },
          ],
        },
        select: {
          id: true,
          userType: true,
        }
      });

      if (existingUser) {
        // User already exists, log them in >>> ` && existingUser.verificationToken`
        if (!existingUser.isVerified) {
          // If the user is not verified but has a verification token, update the isVerified field
          await prisma.user.update({
            where: { id: existingUser.id },
            data: { isVerified: true },
          });
        }
        return res.status(200).json({ user: existingUser, message: "User already exists, please login." });
      }

      // User doesn't exist, create a new account
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await prisma.user.create({
        data: {
          email: lowercaseEmail,
          password: hashedPassword,
          brandName,
          firstName,
          lastName,
          provider,
          userType,
        },
      });

      // Set the expiration date and time, e.g., 1 hour from now
      const expires = new Date();
      expires.setHours(expires.getHours() + 1);

      const token = await prisma.verificationToken.create({
        data: {
          token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
          email: lowercaseEmail,
          userId: newUser.id,
          expires: expires,
        },
      });

      if (token) {
        // Send email
        await SendNewEmail(res, { firstName: firstName, email: lowercaseEmail, token: token.token, userId: token.userId, provider: provider });
      }

      // Create a new session for the user
      const sessionToken = randomUUID().replace(/-/g, '');
      const sessionExpires = new Date();
      sessionExpires.setHours(sessionExpires.getHours() + 1);

      const newSession = await prisma.session.create({
        data: {
          sessionToken,
          userId: newUser.id,
          expires: sessionExpires,
        },
      });

      // Create a new account for the user
      const newAccount = await prisma.account.create({
        data: {
          userId: newUser.id,
          type: 'email',
          provider: newUser.provider,
          providerAccountId: email,
          UserType: newUser.userType,
          // Add other account-related data as needed
        },
      });

      return res.status(201).json({
        user: newUser,
        session: newSession,
        account: newAccount,
        message: "User created successfully. Please check your email to proceed.",
        redirect: "/api/auth/signin",
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: `An error occurred during registration: ${error.message || error}` });
    } finally {
      await prisma.$disconnect();
    }
  }
  return res.status(405).end();
}