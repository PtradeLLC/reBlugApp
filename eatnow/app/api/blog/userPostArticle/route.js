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

// Utility function to normalize slugs
const normalizeSlug = (slug) => slug.toLowerCase().replace(/\s+/g, '-');

// Handle image upload to Cloudinary
async function handleFeatureImageUpload(featureImage) {
    if (featureImage?.startsWith('data:')) {
        try {
            const uploadResult = await cloudinary.v2.uploader.upload(featureImage, {
                folder: 'post/coverImage',
            });
            return uploadResult.secure_url;
        } catch (error) {
            console.error('Error uploading feature image:', error);
            throw new Error('Failed to upload feature image');
        }
    }
    return featureImage;
}

// Handle draft logic
async function handleDraftLogic(post, isDraft, userId) {
    if (isDraft) {
        const existingDraft = await prisma.draft.findUnique({
            where: { postId: post.id },
        });
        const draftData = {
            title: post.title,
            userId,
            postId: post.id,
        };
        if (existingDraft) {
            await prisma.draft.update({
                where: { id: existingDraft.id },
                data: draftData,
            });
        } else {
            await prisma.draft.create({ data: draftData });
        }
    }
}

// Upsert post in the database
async function upsertPost(postData) {
    const {
        userId,
        title,
        featureImage,
        content,
        description,
        crossPromote,
        podcastSingleCast,
        podcastMultiCast,
        selectedValue,
        paramsId,
        categorySlug,
        image,
        selectedFeatures,
        publishedChannels,
        published,
        email,
        isDraft,
        author,
        blogger,
        status,
        commentingSys,
        postNiche,
        postSlug,
        categoryId,
        slug,
    } = postData;

    const normalizedSlug = normalizeSlug(slug);
    const normalizedCategorySlug = normalizeSlug(categorySlug);

    try {
        const post = await prisma.post.upsert({
            where: { slug: normalizedSlug },
            update: {
                userId,
                title,
                featureImage,
                content,
                description,
                crossPromote,
                podcastSingleCast,
                podcastMultiCast,
                selectedValue,
                paramsId,
                categorySlug: normalizedCategorySlug,
                image,
                selectedFeatures,
                publishedChannels,
                published,
                email,
                isDraft,
                author,
                blogger,
                status,
                commentingSys,
                postNiche,
                postSlug,
                categoryId,
            },
            create: {
                userId,
                title,
                featureImage,
                content,
                description,
                crossPromote,
                podcastSingleCast,
                podcastMultiCast,
                selectedValue,
                paramsId,
                categorySlug: normalizedCategorySlug,
                image,
                selectedFeatures,
                publishedChannels,
                published,
                email,
                isDraft,
                author,
                blogger,
                status,
                commentingSys,
                postNiche,
                postSlug,
                categoryId,
                slug: normalizedSlug,
            },
        });

        return post;
    } catch (error) {
        console.error('Error in upsertPost:', error);
        throw new Error('Failed to upsert post');
    }
}

export async function POST(request) {
    try {
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

        if (!title || !featureImage || !content || !categories || !userId || !categorySlug || !slug) {
            return NextResponse.json({ success: false, message: "Please fill out all required fields." }, { status: 400 });
        }

        const sluggedCategory = normalizeSlug(categorySlug);
        const uploadedFeatureImage = await handleFeatureImageUpload(featureImage);
        const updatedContent = await uploadContentImages(content);

        const category = await prisma.category.upsert({
            where: { slug: sluggedCategory },
            update: {},
            create: {
                title: categorySlug,
                slug: sluggedCategory,
            },
        });

        const post = await upsertPost({
            userId,
            title,
            featureImage: uploadedFeatureImage,
            content: updatedContent,
            categorySlug: sluggedCategory,
            author: author.name,
            categories,
            publishedChannels,
            crossPromote,
            podcastSingleCast,
            podcastMultiCast,
            isDraft,
            slug,
            categoryId: category.id,
        });

        await handleDraftLogic(post, isDraft, userId);

        return NextResponse.json({ success: true, post });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
