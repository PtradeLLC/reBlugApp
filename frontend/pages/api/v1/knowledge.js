import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);

    if (req.method === "POST") {
        const data = req.body;

        try {
            // Extract email from session if available
            const email = session?.user?.email;

            if (email) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        provider: true,
                        profileImage: true,
                        brandLogo: true,
                        brandName: true,
                        role: true,
                        isActive: true,
                        image: true,
                        social: true,
                        userType: true,
                    },
                });

                if (user) {
                    try {
                        // Create a new document entry
                        const newDocument = await prisma.document.create({
                            data: {
                                filename: data.filename,
                                userId: user.id,
                            },
                        });

                        // Create a new knowledgeBase entry with the document connected
                        const newKnowledgeBase = await prisma.knowledgeBase.create({
                            data: {
                                userId: user.id,
                                url: data.url,
                                email: data.email,
                                type: data.type,
                                document: {
                                    connect: { id: newDocument.id },
                                },
                                teamId: data.teamId,
                                // Add other fields as needed
                            },
                            include: {
                                document: true,
                                user: true,
                            },
                        });

                        console.log("NEWKB:", newKnowledgeBase);

                        res.status(200).json({ message: 'success' });
                    } catch (error) {
                        console.error('Error creating knowledgeBase entry:', error);
                        res.status(500).json({ message: `There is an error: ${error.message || 'unknown'}`, error });
                    } finally {
                        await prisma.$disconnect();
                    }
                } else {
                    console.error('User not found');
                    res.status(404).json({ message: 'User not found' });
                }
            } else {
                console.error('Email is undefined');
                res.status(400).json({ message: 'Email is undefined' });
            }


        } catch (error) {
            console.error('Error creating knowledgeBase entry:', error);
            res.status(500).json({ message: `There is an error: ${error.message || 'unknown'}`, error });
        } finally {
            await prisma.$disconnect();
        }
        res.status(200).json({ message: 'success' });
    } else {
        console.log('Session not found on the server side');
        res.status(404).json({ message: 'Session not found on the server side' });
    }
}
