import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ message: "User ID not provided" }, { status: 400 });
        }

        const connectedIntegrations = await prisma.integration.findMany({
            where: { userId },
            select: { integrationId: true },
        });

        return NextResponse.json({ providers: connectedIntegrations });
    } catch (error) {
        console.error("Error fetching connectedIntegrations:", error);
        return NextResponse.json({ message: "There is an error: " + error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}