import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
    const { id } = params;

    try {
        const category = await prisma.category.findUnique({
            where: { id: id },
            include: {
                posts: {
                    select: {
                        id: true,
                        title: true,
                        author: true,
                        category: true,
                        featureImage: true,
                        content: true,
                        commentingSys: true,
                        comments: true,
                        createdAt: true,
                        views: true,
                        crossPromote: true,
                        podcastSingleCast: true,
                        podcastMultiCast: true,
                        published: true,
                        userId: true,
                        sponsor: true,
                        Message: true,
                        Chat: true,
                        aiResponses: true,
                        status: true,
                    }
                },
            },
        });

        if (!category) {
            return new Response(JSON.stringify({ error: 'Category not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(category), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error fetching category:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    } finally {
        await prisma.$disconnect();
    }
}
