import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        const {
            title,
            featureImage,
            content,
            crossPromote,
            selectedValue,
            selectedFeatures,
            userInfo, } = req.body;

        const email = userInfo.email;
        const firstName = userInfo.firstName;
        const postSlug = title.toLowerCase().split(' ').join('-');

        const contactAuthor = () => {
            console.log("Author is contacted with:", email);
        };

        if (email) {
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (user) {
                // Check if the post already exists
                let existingPost = await prisma.post.findFirst({
                    where: {
                        title: title,
                        userId: user.id,
                    },
                });

                if (!existingPost) {
                    // If the post doesn't exist, create a new one
                    const newPost = await prisma.post.create({
                        data: {
                            title: title,
                            featureImage: featureImage,
                            content: content,
                            published: true,
                            email: email,
                            views: 0, // Initialize views to 0
                            postSlug: postSlug,
                            crossPromote: crossPromote,
                            selectedValue: selectedValue,
                            selectedFeatures: selectedFeatures,
                            User: {
                                connect: {
                                    id: user.id,
                                },
                            },
                            updatedAt: new Date()
                        },
                    });
                    res.status(200).json(newPost);
                } else {
                    // If the post exists, update the views count
                    const updatedPost = await prisma.post.update({
                        where: {
                            id: existingPost.id,
                        },
                        data: {
                            views: {
                                increment: 1,
                            }
                        },
                        select: {
                            id: true,
                            title: true,
                            content: true,
                            views: true,
                            // likes: true,
                        },
                    });
                    res.status(200).json(updatedPost);
                }
            }
        } else {
            console.log('Invalid data provided');
            res.status(400).json({ message: 'Invalid data provided.' });
        }
    } catch (error) {
        console.error('Error extracting and saving content:', error);
        res.status(500).json({ message: 'Error extracting and saving content.' });
    }
}