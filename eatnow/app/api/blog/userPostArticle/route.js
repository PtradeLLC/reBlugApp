import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { uploadContentImages } from '../../../../utils/imageUtils';
import cloudinary from 'cloudinary';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
    const {
        userId,
        title,
        featureImage,
        content,
        categorySlug,
        publishedChannels,
        crossPromote,
        author,
        categories,
        podcastSingleCast,
        podcastMultiCast,
        isDraft,
        slug,
    } = await request.json();

    if (!title || !featureImage || !content || !categories) {
        return NextResponse.json({ success: false, message: "Please fill out all required fields." }, { status: 400 });
    }

    try {
        console.log(categories, "Selected");

        // Ensure categories is an array
        const categoriesArray = Array.isArray(categories) ? categories : [categories];

        // Upload featureImage to Cloudinary if it's a base64 string
        let uploadedFeatureImage = await handleFeatureImageUpload(featureImage);

        // Upload content images to Cloudinary
        const updatedContent = await uploadContentImages(content);

        // Upsert post in the database
        const post = await upsertPost({
            userId,
            title,
            featureImage: uploadedFeatureImage,
            content: updatedContent,
            categorySlug,
            author,
            categories: categoriesArray,
            publishedChannels,
            crossPromote,
            podcastSingleCast,
            podcastMultiCast,
            isDraft,
            slug,
        });

        // Handle draft logic
        await handleDraftLogic(post, isDraft);

        return NextResponse.json({ success: true, post });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

async function handleFeatureImageUpload(featureImage) {
    if (featureImage && featureImage.startsWith('data:')) {
        try {
            const uploadResult = await cloudinary.v2.uploader.upload(featureImage, {
                folder: 'post/coverImage',
            });
            console.log(`Feature image uploaded: ${featureImage} -> ${uploadResult.secure_url}`);
            return uploadResult.secure_url;
        } catch (error) {
            console.error('Error uploading feature image:', error);
            throw new Error('Failed to upload feature image');
        }
    }
    return featureImage;
}

async function upsertPost(postData) {
    const {
        userId,
        title,
        featureImage,
        content,
        categorySlug,
        author,
        categories,
        publishedChannels,
        crossPromote,
        podcastSingleCast,
        podcastMultiCast,
        isDraft,
        slug,
    } = postData;

    return prisma.post.upsert({
        where: { slug },
        update: {
            title,
            featureImage,
            content,
            categorySlug,
            author: author.name,
            categories: {
                create: categories.map(category => ({ title: category })),
            },
            publishedChannels,
            crossPromote,
            podcastSingleCast,
            podcastMultiCast,
            isDraft,
        },
        create: {
            userId,
            title,
            featureImage,
            content,
            categorySlug,
            author: author.name,
            categories: {
                create: categories.map(category => ({ title: category })),
            },
            publishedChannels,
            crossPromote,
            podcastSingleCast,
            podcastMultiCast,
            isDraft,
            slug,
        },
    });
}

async function handleDraftLogic(post, isDraft) {
    if (isDraft) {
        const existingDraft = await prisma.draft.findUnique({
            where: { postId: post.id },
        });

        if (existingDraft) {
            await prisma.draft.update({
                where: { id: existingDraft.id },
                data: { title: post.title },
            });
        } else {
            await prisma.draft.create({
                data: {
                    title: post.title,
                    postId: post.id,
                },
            });
        }
    }
}