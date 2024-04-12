import prisma from "../../../lib/db";
import { corsMiddleware } from '../cors';

export default async function handler(req, res) {
    try {
        // Apply CORS middleware
        corsMiddleware(req, res, () => { });

        const page = parseInt(req.query.page) || 1;
        const postsPerPage = 12;

        // Fetch all posts
        const posts = await prisma.post.findMany({
            include: {
                category: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            }
        });

        // Calculate total number of pages
        const totalPages = Math.ceil(posts.length / postsPerPage);

        // Return all posts and total number of pages
        return res.status(200).json({ message: posts, totalPages });
    } catch (error) {
        console.error('Error generating content:', error);
        return res.status(500).json({ error: error.message });
    }
}
