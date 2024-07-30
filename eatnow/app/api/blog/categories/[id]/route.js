import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
    const { id } = params;

    console.log("Category ID:", id);
    try {
        const category = await prisma.category.findUnique({
            where: { id: id },
            include: {
                posts: {
                    select: {
                        id: true,
                        title: true,
                        featureImage: true,
                        contentImage: true,
                        views: true,
                        createdAt: true,
                        updatedAt: true,
                        description: true,
                        crossPromote: true,
                        podcastSingleCast: true,
                        podcastMultiCast: true,
                        slug: true,
                        selectedValue: true,
                        paramsId: true,
                        image: true,
                        selectedFeatures: true,
                        publishedChannels: true,
                        published: true,
                        content: true,
                        email: true,
                        isDraft: true,
                        author: true,
                        categorySlug: true,
                        blogger: true,
                        status: true,
                        commentingSys: true,
                        userId: true,
                        postNiche: true,
                        postSlug: true,
                        categoryId: true,
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

        console.log("Category with posts:", category);

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