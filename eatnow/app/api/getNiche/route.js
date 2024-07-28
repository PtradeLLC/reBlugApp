// app/api/getNiche/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle POST request
export async function POST(req) {
    try {
        const { niche, userId, email, name } = await req.json();

        // Validate input
        if (!userId || typeof userId !== 'string') {
            return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
        }

        if (!email || typeof email !== 'string') {
            return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
        }

        if (!name || typeof name !== 'string') {
            return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
        }

        if (!niche || typeof niche !== 'string') {
            return NextResponse.json({ error: 'Invalid niche' }, { status: 400 });
        }

        // Check if user with the same email already exists
        const existingNiche = await prisma.niche.findUnique({ where: { id } });

        if (existingNiche) {
            // If user exists, update the user
            await prisma.user.update({
                where: { email },
                data: { id: userId, name },
            });
        } else {
            // If user does not exist, create a new user
            await prisma.user.create({
                data: { id: userId, email, name },
            });
        }

        // Upsert niche
        const nicheRecord = await prisma.niche.upsert({
            where: { name: niche },
            update: {},
            create: { name: niche },
        });

        // Upsert userShadow
        await prisma.userShadow.upsert({
            where: { userId },
            update: { niche: { connect: { id: nicheRecord.id } } },
            create: { userId, niche: { connect: { id: nicheRecord.id } } },
        });

        return NextResponse.json({ message: 'Niche updated successfully' }, { status: 200 });
    } catch (error) {
        console.error("Server error:", error);
        if (error.code === 'P2002' && error.meta.target.includes('email')) {
            return NextResponse.json({ error: "A user with this email already exists." }, { status: 400 });
        }
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}


// Handle GET request
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return new Response(JSON.stringify({ error: 'userId is required' }), { status: 400 });
        }

        const niches = await prisma.niche.findMany({
            where: {
                userId: userId,
            },
        });

        return new Response(JSON.stringify(niches), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
