import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const data = await req.json();
        const { niche, user } = data;
        const userId = user.$id;

        if (niche && userId) {
            // Check if user already exists
            let existingUser = await prisma.userShadow.findUnique({
                where: { userId: userId }
            });

            // If user doesn't exist, create a new user
            if (!existingUser) {
                existingUser = await prisma.userShadow.create({
                    data: { userId: userId }
                });
            }

            // Upsert the niche, linking it to the user
            const userNiche = await prisma.niche.upsert({
                where: { userId: existingUser.id },
                update: { name: niche },
                create: { userId: existingUser.id, name: niche }
            });

            return NextResponse.json({ userId: userId, niche: niche });
        }

        return NextResponse.json({ message: "Niche or user ID not provided" });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "There is an error: " + error.message });
    }
}