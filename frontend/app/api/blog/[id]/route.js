import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    try {
        // Ensure that 'id' is correctly extracted from 'params'
        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: "ID parameter is required" }, { status: 400 });
        }

        const post = await prisma.post.findUnique({
            where: { id: id },
        });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
