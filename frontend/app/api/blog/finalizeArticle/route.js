import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { postId } = await req.json();

        if (!postId) {
            return new Response(JSON.stringify({ message: "Post ID required" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }


        // Update the post status to 'published'
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: { status: "published" },
        });

        return new Response(JSON.stringify({ message: "Post published successfully", post: updatedPost }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Error finalizing the post:", error);
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

