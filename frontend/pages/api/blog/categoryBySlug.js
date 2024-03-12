import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const postsPerPage = 12;

        // Fetch total number of posts
        const totalPostsCount = await prisma.post.count();

        // Calculate total number of pages
        const totalPages = Math.ceil(totalPostsCount / postsPerPage);

        // Calculate startIndex and endIndex for pagination
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = page * postsPerPage;

        // Fetch a subset of posts based on pagination parameters
        const findAllPost = await prisma.post.findMany({
            include: {
                category: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                    },
                },
            },
        });

        return res.status(200).json({ posts: findAllPost, totalPages });
    } catch (error) {
        console.error('Error generating content:', error);
        return res.status(500).json({ error: 'Error generating content' });
    }
}