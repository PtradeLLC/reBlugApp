import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
    const { id, name, email, isVerified } = await req.json();
    try {
        let user = await prisma.user.findUnique({
            where: { email: email }
        });

        if (user) {
            user = await prisma.user.update({
                where: { email: email },
                data: { id, name, isVerified },
            });
        } else {
            user = await prisma.user.create({
                data: { id: id, email, name, isVerified },
            });
        }

        return NextResponse.json({ message: 'User updated successfully', user }, { status: 200 });
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}