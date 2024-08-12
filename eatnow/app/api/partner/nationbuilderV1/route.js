// app/api/getNiche/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const data = await req.json();

        // Validate input
        if (!data || typeof data !== 'object') {
            return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
        }

        console.log("Data received:", data);

        // Example database operation (replace with actual logic)
        // const createdData = await prisma.yourModel.create({
        //     data: {
        //         userId: data.userId,
        //         ...otherFields
        //     }
        // });

        // Return a success response with the created data
        return NextResponse.json({ message: 'Data created successfully' }, { status: 200 });

    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    } finally {
        // Ensure Prisma disconnects to prevent connection leaks
        await prisma.$disconnect();
    }
}
