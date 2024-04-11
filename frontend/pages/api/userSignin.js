import 'dotenv/config';
import bcrypt from 'bcrypt';
import prisma from "../../lib/db";
import { select } from '@nextui-org/react';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                console.error('Validation error: email or password is missing');
                return res.status(400).json({ message: 'Email or password is missing' });
            }

            const lowercaseEmail = email.toLowerCase();
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: lowercaseEmail,
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    brandName: true,
                    password: true,
                },
            });

            // Check if the user exists
            if (!existingUser) {
                return res.status(404).json({ message: 'User not found. Please sign up for an account.' });
            }

            // Compare the provided password with the hashed password in the database
            const passwordMatch = await bcrypt.compare(password, existingUser.password);

            if (passwordMatch) {
                // Return the user information
                return res.status(200).json({
                    user: existingUser,
                    message: 'User signed in successfully',
                    redirect: '/dashboard',
                });
            } else {
                return res.status(401).json({ message: 'Invalid email or password. Please review your login credentials or reset your password.' });
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
            return res.status(500).json({ error: `An error occurred during sign-in: ${error.message || error}` });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
