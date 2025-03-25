import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuration for API route
const config = {
    api: {
        bodyParser: {
            sizeLimit: '5mb',
        },
    },
};

export { config };

export async function POST(request) {
    try {
        const formData = await request.formData();
        const brandName = formData.get('brandName');
        const productName = formData.get('productName');
        const website = formData.get('website');
        const productMessage = formData.get('productMessage');
        const notes = formData.get('notes');
        const file = formData.get('productImage');

        if (!file || typeof file === 'string') {
            return NextResponse.json(
                { error: 'File blob is required.' },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Convert the buffer to a base64 string
        const base64Image = buffer.toString('base64');
        const dataUri = `data:${file.type};base64,${base64Image}`;

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(dataUri, {
            folder: 'postSponsors',
            public_id: `${Date.now()}_${file.name}`,
        });

        const productImage = uploadResponse.secure_url;

        // Save to database
        const newArticle = await prisma.message.create({
            data: {
                brandName,
                productName,
                website,
                productMessage,
                notes,
                productImage,
            },
        });

        return NextResponse.json(
            { message: 'File uploaded successfully', productImage },
            { status: 200 }
        );
    } catch (e) {
        console.error('Error while processing file upload:', e);
        return NextResponse.json(
            { error: 'Something went wrong.' },
            { status: 500 }
        );
    }
}