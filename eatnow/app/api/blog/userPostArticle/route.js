import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { uploadContentImages } from '../../../../utils/imageUtils'; // Import the function

// Configure Cloudinary
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();

export async function POST(request) {
    if (request.method !== 'POST') {
        return new NextResponse('Method Not Allowed', { status: 405 });
    }

    const {
        userId,
        title,
        featureImage,
        content,
        categorySlug,
        publishedChannels,
        crossPromote,
        podcastSingleCast,
        podcastMultiCast,
        isDraft,
        slug,
    } = await request.json();

    if (!title || !featureImage || !content) {
        return NextResponse.json({ success: false, message: "Please fill out all required fields." }, { status: 400 });
    }

    try {
        // Upload featureImage to Cloudinary
        let uploadedFeatureImage = featureImage;
        if (featureImage && featureImage.startsWith('data:')) {
            const uploadResult = await cloudinary.uploader.upload(featureImage, {
                folder: 'post/coverImage',
            });
            uploadedFeatureImage = uploadResult.secure_url;
        }

        // Use the imported function to upload images in the content
        const updatedContent = await uploadContentImages(content);

        const post = await prisma.post.upsert({
            where: {
                slug: slug,
            },
            update: {
                title: title,
                featureImage: uploadedFeatureImage,
                content: updatedContent,
                categorySlug: categorySlug,
                publishedChannels: publishedChannels,
                crossPromote: crossPromote,
                podcastSingleCast: podcastSingleCast,
                podcastMultiCast: podcastMultiCast,
            },
            create: {
                userId: userId,
                title: title,
                featureImage: uploadedFeatureImage,
                content: updatedContent,
                categorySlug: categorySlug,
                publishedChannels: publishedChannels,
                crossPromote: crossPromote,
                podcastSingleCast: podcastSingleCast,
                podcastMultiCast: podcastMultiCast,
                isDraft: isDraft,
                slug: slug,
            },
        });

        return NextResponse.json({ success: true, post });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}