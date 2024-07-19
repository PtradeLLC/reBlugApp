import { getSession } from "next-auth/react";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { postId } = req.body;

    if (!postId) {
        return res.status(400).json({ message: "Post ID is required" });
    }

    try {
        // Update the post status to 'published'
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: { status: "published" },
        });

        return res.status(200).json({ message: "Post published successfully", post: updatedPost });
    } catch (error) {
        console.error("Error finalizing the post:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
