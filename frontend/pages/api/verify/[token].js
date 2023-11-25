// Example verification API route
import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { useRouter } from "next/router";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const router = useRouter();

    if (req.method === "GET") {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({ message: "Token is missing." });
        }

        try {
            const user = await prisma.user.findFirst({
                where: {
                    verificationToken: {
                        some: {
                            AND: [
                                {
                                    activatedAt: null,
                                },
                                {
                                    createdAt: {
                                        gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
                                    },
                                },
                                {
                                    token
                                },
                            ],
                        },
                    },
                },
            })

            if (!user) {
                console.error("There has been an error:", error);
                throw new Error('Token is invalid or expired');
            }

            // Update user status to verified
            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    isVerified: true,
                },
            });

            await prisma.verificationToken.update({
                where: {
                    token,
                },
                data: {
                    activatedAt: new Date(),
                },
            });
            router.push("/api/auth/signin");
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: `An error occurred during verification: ${error}` });
        } finally {
            await prisma.$disconnect();
        }
    }

    return res.status(404).json({ message: "Not Found" });
}
