import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Function to strip HTML tags from a string
function stripHtmlTags(html) {
    return html.replace(/<[^>]*>?/gm, ''); // Replace HTML tags with an empty string
}

export default async function handler(req, res) {
    try {
        const allPosts = await prisma.post.findMany({
            where: { published: true },
            include: {
                comments: {
                    select: { content: true },
                },
            },
        });

        // Remove HTML tags from the content field
        const postsWithoutHtml = allPosts.map(post => ({
            ...post,
            content: stripHtmlTags(post.content)
        }));

        res.status(200).json(postsWithoutHtml);
    } catch (error) {
        console.error('Error extracting and saving content:', error);
        res.status(500).json({ message: 'Error extracting and saving content.' });
    }
}
