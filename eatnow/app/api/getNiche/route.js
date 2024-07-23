// app/api/getNiche/route.js

import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { niche, userId } = await req.json();


        if (!userId || typeof userId !== 'string') {
            return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
        }

        if (!niche || typeof niche !== 'string') {
            return NextResponse.json({ error: 'Invalid niche' }, { status: 400 });
        }


        const nicheRecord = await prisma.niche.upsert({
            where: { name: niche },
            update: {},
            create: { name: niche },
        });


        // Update or create user shadow with the new niche
        const updatedUserShadow = await prisma.userShadow.upsert({
            where: { userId },
            update: { niche: { connect: { id: nicheRecord.id } } },
            create: { userId, niche: { connect: { id: nicheRecord.id } } },
        });


        return NextResponse.json({ message: 'Niche updated successfully', updatedUserShadow }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId || typeof userId !== 'string') {
            return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
        }

        const userShadow = await prisma.userShadow.findUnique({
            where: { userId },
            include: { niche: true },
        });

        if (!userShadow) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ userNiche: userShadow.niche?.name }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
