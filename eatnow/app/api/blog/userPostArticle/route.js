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
        author,
        blogger,
        status,
        commentingSys,
        postNiche,
        postSlug,
        categoryId,
        slug,
        seriesId, // Added for series support
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
                author,
                blogger,
                status,
                commentingSys,
                postNiche,
                postSlug,
                categoryId,
                seriesId, // Added for series support
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
                author,
                blogger,
                status,
                commentingSys,
                postNiche,
                postSlug,
                categoryId,
                slug: normalizedSlug,
                seriesId, // Added for series support
            },
        });

        return post;
    } catch (error) {
        console.error('Error in upsertPost:', error);
        throw new Error('Failed to upsert post');
    }
}

// Handle POST request
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
            isSeries,
            seriesTitle,
        } = await request.json();

        if (!title || !featureImage || !content) {
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

        let seriesId = null;
        let seriesPosts = [];

        if (isSeries && seriesTitle) {
            const normalizedSeriesTitle = normalizeSlug(seriesTitle);
            const series = await prisma.series.upsert({
                where: { title: normalizedSeriesTitle },
                update: {
                    categoryId: category.id,
                },
                create: {
                    title: seriesTitle,
                    categoryId: category.id,
                },
            });
            seriesId = series.id;

            // Fetch all posts in the series for the current user
            seriesPosts = await prisma.post.findMany({
                where: {
                    seriesId: series.id,
                    userId,
                },
            });
        }

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
            published: true,
            slug,
            categoryId: category.id,
            seriesId, // Added for series support
        });

        // If a draft ID is needed, handle the draft logic here (assuming you have such a function)
        // const draftId = await handleDraftLogic(post, isDraft, userId);

        return NextResponse.json({ success: true, post, seriesPosts });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}