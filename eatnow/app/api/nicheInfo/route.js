import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (userId) {
            const userNiche = await prisma.niche.findUnique({
                where: { userId },
            });

            if (userNiche) {
                return NextResponse.json({ niche: userNiche.name });
            } else {
                return NextResponse.json({ niche: null });
            }
        }

        return NextResponse.json({ message: "User ID not provided" });
    } catch (error) {
        console.error("Error fetching niche:", error);
        return NextResponse.json({ message: "There is an error: " + error.message });
    }
}
