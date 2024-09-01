import { NextResponse } from "next/server";

// This route uses Nango to connect external data sources to the app.
export async function POST(req) {
    try {
        const { data } = await req.json(); // Expecting data from Nango webhook

        console.log("Data from Nango", data);

        // Here, save data to your database
        // For example, if using Prisma:
        // await prisma.integrationData.create({ data });

        return NextResponse.json({ message: "Data processed successfully" });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ message: "There is an error: " + error.message }, { status: 500 });
    }
}

// Handle other HTTP methods
export async function GET() {
    return NextResponse.json({ message: "GET method is not supported for this endpoint." }, { status: 405 });
}

export async function PUT() {
    return NextResponse.json({ message: "PUT method is not supported for this endpoint." }, { status: 405 });
}

export async function DELETE() {
    return NextResponse.json({ message: "DELETE method is not supported for this endpoint." }, { status: 405 });
}
