import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const formData = await request.json();
        const content = formData.content; // Extract content from the parsed formData

        // Process the content and generate a response
        const responseMessage = `You sent: ${content}`;
        console.log(responseMessage);
        return NextResponse.json({ message: responseMessage });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.error();
    }
}