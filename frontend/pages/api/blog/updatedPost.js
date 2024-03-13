import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        const allPosts = await prisma.post.findMany();

        if (allPosts && allPosts.length > 0) {
            for (const post of allPosts) {
                const postTitle = post.title;
                const postSlug = postTitle.toLowerCase().split(' ').join('-');

                // Update the slug for each post
                await prisma.post.update({
                    where: {
                        id: post.id,
                    },
                    data: {
                        slug: postSlug,
                        published: true,
                    },
                });
            }

            res.status(200).json({ message: "Updated posts successfully" });
        } else {
            res.status(404).json({ message: "No posts found" });
        }
    } catch (error) {
        console.error('Error extracting and saving content:', error);
        res.status(500).json({ message: 'Error extracting and saving content.' });
    }
}
