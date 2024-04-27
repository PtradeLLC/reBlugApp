import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function uploadFile(request, response) {
    try {
        const filename = request.query.filename;

        // Check if a file is included in the request body
        if (!request.body || request.body.length === 0) {
            throw new Error('No file included in the request body.');
        }

        const file = request.body[0];
        const blob = await put(filename, file, { access: 'public' });

        console.log('Blob:', blob);
        // Send the JSON response using the response object
        response.json(blob);
    } catch (error) {
        console.error('Error uploading file:', error);
        // Send an error response
        response.status(500).json({ error: 'Failed to upload the file.' });
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20mb', // Set the maximum request body size limit
        },
        // Use edge runtime to support returning Response objects
        runtime: 'edge',
    },
};