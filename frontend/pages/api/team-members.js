import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

export default async function handler(req, res) {
    try {
        // Check if the request method is POST
        if (req.method !== "POST") {
            throw new Error('Invalid HTTP method');
        }

        // Extract the user data from the request body
        const usersData = req.body;

        console.log("UData", usersData);
        // Check if user data is provided
        if (!usersData || !Array.isArray(usersData)) {
            return res.status(400).json({ message: "Invalid user data" });
        };

        const createdUsers = [];

        for (const userData of usersData) {
            const { email, userId } = userData;

            // Check if userId and email are provided
            if (!userId || !email) {
                return res.status(400).json({ message: "UserId and email are required" });
            };

            // Create a new record in the emailList table associated with the user
            const emailData = await prisma.emailList.create({
                data: {
                    email: email,
                    User: {
                        connect: { id: userId }
                    }
                }
            });

            console.log("EMAIL DATA:", emailData);

            // Find the user based on the userId
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            console.log("USER:", user);

            createdUsers.push(user);
        }

        // Respond with the created users
        res.status(200).json(createdUsers);
    } catch (error) {
        // Handle any potential errors
        res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
}
