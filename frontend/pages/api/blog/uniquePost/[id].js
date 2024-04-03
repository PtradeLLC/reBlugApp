import prisma from "../../../../lib/db";

export default async function handler(req, res) {
    const { id } = req.query;

    try {
        const singlePost = await prisma.post.findUnique({
            where: {
                id: id,
            },
            include: {
                comments: {
                    include: {
                        AiResponse: true,
                        user: {
                            select: {
                                firstName: true,
                                email: true
                            }
                        }
                    },
                },
                category: true
            },
        });

        if (!singlePost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Extract category information from the post
        const { category, ...postData } = singlePost;

        // Create a new object with the necessary category information
        const responseData = {
            ...postData,
            category: {
                id: category.id,
                title: category.title,
                slug: category.slug,
                userId: category.userId
            }
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error creating or fetching post:', error);
        res.status(500).json({ message: 'Error creating or fetching post.' });
    }
}
