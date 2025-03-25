import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        //PASS A TRIGGER ON THE FRONTEND TO FETCHPUBLISHED
        const { userId, fetchPublished } = await req.json();

        const drafts = await prisma.post.findMany({
            where: {
                userId: userId,
                isDraft: true,
            },
        });

        let publishedPosts = [];
        if (fetchPublished) {
            publishedPosts = await prisma.post.findMany({
                where: {
                    userId: userId,
                    published: true,
                },
            });
        }

        return NextResponse.json({ success: true, drafts, publishedPosts });
    } catch (error) {
        console.error('Error fetching drafts or published posts:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}