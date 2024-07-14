import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const formData = await request.json();
        const { userId, title, cover, niche, articleBody, features } = formData;

        const newArticle = await prisma.post.create({
            data: {
                title: title || "", // Default to empty string if title is undefined
                featureImage: cover || "", // Default to empty string if cover is undefined
                content: articleBody || "",
                categorySlug: niche || "", // Default to empty string if niche is undefined
                published: features?.publishEverywhere || false,
                crossPromote: features?.crossPromotion || false,
                commentingSys: features?.comments || true,
                userId: userId,
            },
        });



        return NextResponse.json({ message: 'Article created successfully', newArticle });
    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
    }
}