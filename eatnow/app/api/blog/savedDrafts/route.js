import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        // Parse the request body
        const { userId } = await req.json();

        // Find the user
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            // User not found
            return new Response(JSON.stringify({ message: "User not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Find all posts
        const allPosts = await prisma.draft.findMany({
            where: {
                id: userId
            }
        }
        );

        // Return all posts if user is found
        return new Response(JSON.stringify(allPosts), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Error fetching posts:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    } finally {
        await prisma.$disconnect();
    }
}
