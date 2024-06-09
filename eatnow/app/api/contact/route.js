import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { firstName, lastName, company, email, reason, message } = await request.json();
        // Save the form data to the database
        const contact = await prisma.contact.create({
            data: {
                firstName,
                lastName,
                company,
                email,
                reason,
                message,
            },
        });

        // To do: Send email to admin of form data

        // Respond with a success message
        return NextResponse.json({ success: true, contact });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
