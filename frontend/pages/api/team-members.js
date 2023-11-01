import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

export default async function handler(req, res) {
    try {
        // Check if the request method is POST
        if (req.method !== "POST") {
            throw new Error('Invalid HTTP method');
        }

        // Extract the email from the request body
        const data = req.body;
        const { email } = data;

        // Check if email is provided
        if (!email) {
            return res.status(400).json({ message: "No email provided" });
        }

        // Create a new record in the emailList table
        const emailData = await prisma.emailList.create({
            data: {
                email: email
            }
        });

        // Extract the created email
        const createdEmail = emailData.email;

        // Respond with the created email
        res.status(200).json({ createdEmail });
    } catch (error) {
        // Handle any potential errors
        res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
}
