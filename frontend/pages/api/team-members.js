import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// const prisma = new PrismaClient().$extends(withAccelerate());
const prisma = new PrismaClient();


export default async function handler(req, res) {
    // Check if the request method is POST
    if (req.method !== "POST") {
        throw new Error('Invalid HTTP method');
    };
    if (req.method === "POST") {
        try {
            // Extract the user data from the request body
            const usersData = req.body;
            console.log("Parsed user data:", usersData);
            // Check if user data is provided
            // Check if user data is provided
            if (!usersData || !Array.isArray(usersData.emails)) {
                return res.status(400).json({ message: "Invalid user data" });
            }

            const createdUsers = [];

            // Extract the array of emails
            const emails = usersData.emails;
            for (const email of emails) {
                // Check if userId and email are provided
                if (!email) {
                    return res.status(400).json({ message: "email is required" });
                };

                const eData = await prisma.user.findMany({
                    where: {
                        email: {
                            contains: email,
                        },
                    },
                });

                console.log("U-data", eData);

                // if (!eData) {
                //     // Create a new record in the emailList table associated with the user
                //     const emailData = await prisma.emailList.create({
                //         data: {
                //             email: email,
                //             User: {
                //                 connect: { id: userId }
                //             }
                //         }
                //     });
                //     return emailData;
                // } else {
                //     //Associate with the user to the 
                //     //SEND EMAIL INVITE TO THE USER.

                // }

                // console.log("EMAIL DATA:", emailData);

                // // Find the user based on the userId
                // const user = await prisma.user.findUnique({
                //     where: {
                //         id: userId
                //     }
                // });

                // if (!user) {
                //     return res.status(404).json({ message: "User not found" });
                // }
                // createdUsers.push(user);
            }
            // Respond with the created users
            // res.status(200).json(createdUsers);
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error processing request:', error);
            res.status(400).json({ success: false, error: 'Invalid request data' });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }

}
