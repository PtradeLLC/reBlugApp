import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
    const { id, name, email } = await req.json();
    try {
        let user = await prisma.user.findUnique({
            where: { id: id }
        });

        if (user) {
            user = await prisma.user.update({
                where: { id: id },
                data: { email, name },
            });
        } else {
            user = await prisma.user.create({
                data: { id: id, email, name },
            });
        }

        return NextResponse.json({ message: 'User updated successfully', user }, { status: 200 });
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
