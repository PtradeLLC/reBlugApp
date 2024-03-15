import { title } from "process";
import prisma from "../../../../lib/db";

export default async function handler(req, res) {
    const { id } = req.query;

    try {
        const singleCategory = await prisma.category.findUnique({
            where: {
                id: String(id),
            },
            include: {
                posts: {
                    select: {
                        id: true,
                        title: true,
                        category: true,
                        user: true,
                    }
                },
            },
        });

        if (!singleCategory) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Extract category information from the post
        // const { category, ...postData } = singleCategory;

        // Create a new object with the necessary category information
        // const responseData = {
        //     ...postData,
        //     category: {
        //         id: category.id,
        //         title: category.title,
        //         slug: category.slug,
        //         userId: category.userId
        //     }
        // };
        res.status(200).json(singleCategory);
    } catch (error) {
        console.error('Error creating or fetching post:', error);
        res.status(500).json({ message: 'Error creating or fetching post.' });
    }
}

