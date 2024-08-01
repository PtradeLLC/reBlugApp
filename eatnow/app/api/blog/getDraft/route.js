import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { userId } = await req.json();

        const drafts = await prisma.post.findMany({
            where: {
                userId: userId,
                isDraft: true,
            },
        });

        return NextResponse.json({ success: true, drafts });
    } catch (error) {
        console.error('Error fetching drafts:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
