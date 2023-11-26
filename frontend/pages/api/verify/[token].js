import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({ message: "Token is missing." });
        }

        try {
            const user = await prisma.user.findFirst({
                where: {
                    VerificationTokens: {
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
                                    token,
                                },
                            ],
                        },
                    },
                },
            });

            if (!user) {
                console.error("There has been an error: Token is invalid or expired");
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

            // Disconnect Prisma client before sending the response
            await prisma.$disconnect();

            // Redirect immediately
            res.writeHead(302, { Location: 'https://my-web-app.com/api/auth/signin' });
            res.end();
        } catch (error) {
            console.error(error);
            if (error.message === 'Token is invalid or expired') {
                return res.status(400).json({ error: 'Token is invalid or expired' });
            } else {
                return res.status(500).json({ error: `An error occurred during verification: ${error.message}` });
            }
        }
    }

    return res.status(404).json({ message: "Not Found" });
}


// // Example verification API route
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//     if (req.method === "GET") {
//         const { token } = req.query;

//         if (!token) {
//             return res.status(400).json({ message: "Token is missing." });
//         }

//         try {
//             const user = await prisma.user.findFirst({
//                 where: {
//                     VerificationTokens: {
//                         some: {
//                             AND: [
//                                 {
//                                     activatedAt: null,
//                                 },
//                                 {
//                                     createdAt: {
//                                         gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
//                                     },
//                                 },
//                                 {
//                                     token,
//                                 },
//                             ],
//                         },
//                     },
//                 },
//             });

//             if (!user) {
//                 console.error("There has been an error:", error);
//                 throw new Error('Token is invalid or expired');
//             }

//             // Update user status to verified
//             await prisma.user.update({
//                 where: {
//                     id: user.id,
//                 },
//                 data: {
//                     isVerified: true,
//                 },
//             });

//             await prisma.verificationToken.update({
//                 where: {
//                     token,
//                 },
//                 data: {
//                     activatedAt: new Date(),
//                 },
//             });

//             // Redirect immediately using res.redirect
//             res.redirect('/api/auth/signin');
//         } catch (error) {
//             console.error(error);
//             return res.status(500).json({ error: `An error occurred during verification: ${error.message}` });
//         } finally {
//             await prisma.$disconnect();
//         }
//     }

//     return res.status(404).json({ message: "Not Found" });
// }
