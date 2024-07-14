import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const formData = await request.json();
        const { userId, title, cover, niche, features } = formData;

        console.log("Received form data:", { userId, title, cover, niche, features });

        const newArticle = await prisma.post.create({
            data: {
                title: title || "", // Default to empty string if title is undefined
                featureImage: cover || "", // Default to empty string if cover is undefined
                content: "This is a sample content",
                categorySlug: niche || "", // Default to empty string if niche is undefined
                published: features?.publishEverywhere || false, // Default to false if publishEverywhere is undefined
                userId: userId,
            },
        });

        console.log("New article created:", newArticle);

        return NextResponse.json({ message: 'Article created successfully', newArticle });
    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
    }
}