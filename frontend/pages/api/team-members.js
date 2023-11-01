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
        const { email, userId } = data;
        console.log(data);
        console.log(email);
        console.log(userId);

        // Check if email is provided
        if (!userId || !email) {
            return res.status(400).json({ message: "UserId and email are required" });
        };

        // find the user based on the userId
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // create a new record in the emailList table associated it with the user
        const emailData = await prisma.emailList.create({
            data: {
                email: email,
                User: {
                    connect: { id: userId }
                }
            }
        });

        // Extract the created email
        const createdEmail = emailData.email;

        // Respond with the created email
        res.status(200).json(createdEmail);
    } catch (error) {
        // Handle any potential errors
        res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
}
