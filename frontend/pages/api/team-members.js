import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import ws from 'ws'

dotenv.config()
neonConfig.webSocketConstructor = ws
const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)

const prisma = new PrismaClient({ adapter })

export default async function handler(req, res) {
    // Check if the request method is POST
    if (req.method !== "POST") {
        throw new Error('Invalid HTTP method');
    };
    if (req.method === "POST") {
        try {
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

                console.log(email, userId);

                const eData = await prisma.user.findMany({
                    where: {
                        email: {
                            contains: "chrisb@publictrades.com",
                        },
                    },
                    cacheStrategy: { ttl: 60 },
                });

                console.log("U-data", eData);

                // Create a new record in the emailList table associated with the user
                // const emailData = await prisma.emailList.create({
                //     data: {
                //         email: email,
                //         User: {
                //             connect: { id: userId }
                //         }
                //     }
                // });

                // console.log("EMAIL DATA:", emailData);

                // Find the user based on the userId
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
