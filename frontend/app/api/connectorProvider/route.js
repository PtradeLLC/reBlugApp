import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { Nango } from '@nangohq/node';

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        const { integrationId, connectionId, userId } = await req.json();

        // Validate input
        if (!integrationId || !connectionId || !userId) {
            return NextResponse.json({ message: "Missing required fields: integrationId, connectionId, and userId are required." }, { status: 400 });
        }

        // Check if NANGO_SECRET_KEY_PROD is set in the environment
        if (!process.env.NANGO_SECRET_KEY_PROD) {
            throw new Error("NANGO_SECRET_KEY_PROD is not set in the environment variables");
        }

        const nango = new Nango({ secretKey: process.env.NANGO_SECRET_KEY_PROD });

        // Check if integration already exists for this user
        const existingIntegration = await prisma.integration.findFirst({
            where: { integrationId, userId },
        });

        if (existingIntegration) {
            return NextResponse.json({ message: "Integration already exists for this user." }, { status: 400 });
        }

        // Create connection with Nango using the provided connectionId
        const connection = await nango.createConnection(connectionId, userId);

        if (!connection || !connection.id) {
            return NextResponse.json({ message: "Failed to create connection with Nango." }, { status: 500 });
        }

        // Save the new integration in the database
        const integration = await prisma.integration.create({
            data: {
                connectionId: connection.id,
                integrationId,
                userId,
            },
        });

        console.log("Integration", integration);
        return NextResponse.json({ message: "Provider connected successfully", integration });
    } catch (error) {
        console.error("Error connecting provider:", error);
        return NextResponse.json({ message: "There is an error: " + error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
