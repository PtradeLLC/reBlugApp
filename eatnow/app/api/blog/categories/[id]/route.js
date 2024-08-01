import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
    const { id } = params;

    if (!id) {
        return new Response('ID not provided', { status: 400 });
    }

    try {
        const categoryWithPosts = await prisma.category.findUnique({
            where: { id },
            include: {
                Post: {
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
                        categoryId: true
                    }
                }
            }
        });

        if (!categoryWithPosts) {
            return NextResponse.json({ success: false, message: 'Category not found.' }, { status: 404 });
        }

        console.log("Cat with post", categoryWithPosts);

        return NextResponse.json({ success: true, category: categoryWithPosts });
    } catch (error) {
        console.error('Error fetching category:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch category.' }, { status: 500 });
    }
}
