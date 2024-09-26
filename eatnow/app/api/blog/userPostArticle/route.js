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
            include: {
                series: true, // Include the series relation in the response
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
        // Extract request data
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

        // Validate required fields
        if (!title || !featureImage || !content) {
            return NextResponse.json({ success: false, message: "Please fill out all required fields." }, { status: 400 });
        }

        // Handle image upload and content processing
        const sluggedCategory = normalizeSlug(categorySlug);
        const uploadedFeatureImage = await handleFeatureImageUpload(featureImage);
        const updatedContent = await uploadContentImages(content);

        // Upsert category
        const category = await prisma.category.upsert({
            where: { slug: sluggedCategory },
            update: {},
            create: {
                title: categorySlug,
                slug: sluggedCategory,
            },
        });

        // Handle series upsert and post retrieval
        let seriesId = null;
        let seriesPosts = [];

        if (isSeries && seriesTitle) {
            const normalizedSeriesTitle = normalizeSlug(seriesTitle);
            const series = await prisma.series.upsert({
                where: { title: normalizedSeriesTitle },
                update: {
                    categoryId: category.id,
                    userId, // Update the series with the current userId
                },
                create: {
                    title: seriesTitle,
                    categoryId: category.id,
                    userId, // Create the series with the current userId
                },
            });
            seriesId = series.id;

            // Fetch all posts in the series for the current user
            seriesPosts = await prisma.post.findMany({
                where: {
                    seriesId: series.id,
                    userId,
                },
                select: {
                    title: true,
                },
            });
        }

        // Upsert post with series relation
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
            seriesId,
        });

        // Return the post data with series title included
        return NextResponse.json({ success: true, post, seriesPosts });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}