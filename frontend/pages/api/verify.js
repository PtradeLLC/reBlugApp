// Example verification API route
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({ message: "Token is missing." });
        }

        try {
            const user = await prisma.user.findUnique({
                where: {
                    verificationToken: token,
                },
            });

            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            // Update user status to verified
            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    isVerified: true,
                    verificationToken: null, // Optionally clear the verification token
                },
            });

            return res.status(200).json({ message: "Account verified successfully." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: `An error occurred during verification: ${error}` });
        } finally {
            await prisma.$disconnect();
        }
    }

    return res.status(404).json({ message: "Not Found" });
}
