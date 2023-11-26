// import { PrismaClient } from '@prisma/client';
// import { redirect } from 'next/navigation';
// import { NextRequest } from 'next/server';
// import { withAccelerate } from '@prisma/extension-accelerate';

// const prisma = new PrismaClient().$extends(withAccelerate());

// export default async function handler(req, { query }) {
//     const { token } = req.query;

//     if (!token) {
//         console.log('Invalid parameters. Token is missing. query:', query);
//         console.log('Invalid parameters. Token is missing. Req.query:', req.query);
//         console.log('Invalid parameters. Token:', token);
//         throw new Error('Invalid parameters. Token is missing.');
//     }

//     // Rest of the code remains unchanged
//     const user = await prisma.user.findFirst({
//         where: {
//             VerificationTokens: {
//                 some: {
//                     AND: [
//                         {
//                             activatedAt: null,
//                         },
//                         {
//                             createdAt: {
//                                 gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
//                             },
//                         },
//                         {
//                             token,
//                         },
//                     ],
//                 },
//             },
//         },
//     });


//     if (!user) {
//         throw new Error('Token is invalid or expired');
//     }

//     await prisma.user.update({
//         where: {
//             id: user.id,
//         },
//         data: {
//             isVerified: true,
//         },
//     });

//     await prisma.verificationToken.update({
//         where: {
//             token,
//         },
//         data: {
//             activatedAt: new Date(),
//         },
//     });

//     redirect('/api/auth/signin');
// }





import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { token } = req.query;

        if (!token) {
            console.log('Invalid parameters. Token is missing. query:', query);
            console.log('Invalid parameters. Token is missing. Req.query:', req.query);
            console.log('Invalid parameters. Token:', token);
            throw new Error('Invalid parameters. Token is missing.');
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
            res.redirect('/api/auth/signin');
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
