import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro-exp-03-25",
});
const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export async function POST(req) {

    try {
        const { data } = await req.json();
        console.log("User Prompt:", data);

    } catch (error) {
        console.error("Error generating AI response:", error);
        return NextResponse.json(
            { message: "There is an error: " + error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
    return NextResponse.json({ message: responseText });
}
