import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// Initialize Prisma Client
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { userId, fetchPublished } = await req.json();

        // Fetch drafts
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
                    isDraft: false,
                    published: true,
                    status: true,
                },
            });
        }

        return NextResponse.json({ success: true, drafts, publishedPosts });
    } catch (error) {
        console.error('Error fetching drafts or published posts:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}



// import { PrismaClient } from '@prisma/client';
// import { NextResponse } from 'next/server';

// // Initialize Prisma Client using a singleton pattern
// const prisma = global.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

// export async function POST(req) {
//     try {
//         const { userId, fetchPublished } = await req.json();

//         if (!userId) {
//             return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
//         }

//         const drafts = await prisma.post.findMany({
//             where: { userId, isDraft: true },
//         });

//         let publishedPosts = [];
//         if (fetchPublished) {
//             publishedPosts = await prisma.post.findMany({
//                 where: { userId, published: true },
//             });
//         }

//         return NextResponse.json({ success: true, drafts, publishedPosts });
//     } catch (error) {
//         console.error('Error fetching drafts or published posts:', error);
//         return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//     }
// }