import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { userId } = await req.json();

        const publishedPosts = await prisma.post.findMany({
            where: {
                userId: userId,
                published: true,
            },
        });

        return NextResponse.json({ success: true, publishedPosts });
    } catch (error) {
        console.error('Error fetching published posts:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
