import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
    const { id } = params;

    if (!id) {
        return new Response('ID not provided', { status: 400 });
    }
    try {
        const categoryWithPosts = await prisma.post.findMany({
            where: { categoryId: id },
            select: {
                id: true,
                title: true,
                featureImage: true,
                views: true,
                slug: true,
                content: true,
                author: true,
                categorySlug: true,
                categoryId: true,
                publishedChannels: true,
                isDraft: true
            }
        });

        if (!categoryWithPosts) {
            return NextResponse.json({ success: false, message: 'Category not found.' }, { status: 404 });
        }

        return NextResponse.json({ success: true, category: categoryWithPosts });
    } catch (error) {
        console.error('Error fetching category:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch category.' }, { status: 500 });
    }
}
