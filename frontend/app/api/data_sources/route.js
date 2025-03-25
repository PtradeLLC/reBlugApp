import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { connectionId, integrationId, userId } = await req.json();

        // Validate required fields
        if (!connectionId || !integrationId || !userId) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Save the integration data to the database
        const integration = await prisma.integration.create({
            data: {
                connectionId,
                integrationId,
                userId,
            },
        });


        return NextResponse.json({ message: "Integration saved successfully", integration });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ message: "There was an error: " + error.message }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ message: "Missing userId parameter" }, { status: 400 });
        }

        // Fetch connected integrations for the user
        const connectedIntegrations = await prisma.integration.findMany({
            where: { userId },
            select: { integrationId: true },
        });

        return NextResponse.json(connectedIntegrations);
    } catch (error) {
        console.error("Error fetching integrations:", error);
        return NextResponse.json({ message: "There was an error: " + error.message }, { status: 500 });
    }
}

export async function PUT() {
    return NextResponse.json({ message: "PUT method is not supported for this endpoint." }, { status: 405 });
}

export async function DELETE() {
    return NextResponse.json({ message: "DELETE method is not supported for this endpoint." }, { status: 405 });
}