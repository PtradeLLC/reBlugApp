import 'dotenv/config';
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';
import { authOptions } from "next-auth";
import { getServerSession } from "next-auth";
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                console.error("Validation error: email is missing");
                return res.status(400).json({ message: "An entry is missing" });
            }

            const lowercaseEmail = email.toLowerCase();

            const existingUser = await prisma.user.findUnique({
                where: {
                    email: lowercaseEmail,
                },
                cacheStrategy: { swr: 60, ttl: 60 },
            });

            // Check if User already exists
            if (existingUser) {
                // User already exists, log them in
                return res.status(200).json({ user: existingUser, message: "User already exists, logging in.", redirect: "/dashboard" });
            }

            // Send any additional information you want to the client
            return res.status(201).json({ user: newUser, message: "User created successfully.", redirect: "/dashboard" });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: `An error occurred during registration: ${error}` });
        } finally {
            await prisma.$disconnect();
        }
    }
}
