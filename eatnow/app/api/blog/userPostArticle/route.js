import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const formData = await request.json();
        const { userId, title, cover, niche, articleBody, features } = formData;

        const newArticle = await prisma.post.create({
            data: {
                title: title || "",
                featureImage: cover || "",
                content: articleBody || "",
                categorySlug: niche || "",
                publishedChannels: features?.publishedChannels || false,
                crossPromote: features?.crossPromotion || false,
                userId: userId,
            },
        });
        return NextResponse.json({ message: 'Article created successfully', newArticle });
    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
    }
}