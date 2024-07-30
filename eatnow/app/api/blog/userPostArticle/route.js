import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { uploadContentImages } from '../../../../utils/imageUtils';
import cloudinary from 'cloudinary';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Configure Cloudinary
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Missing Cloudinary environment variables');
}

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Utility function to normalize slugs
const normalizeSlug = (slug) => slug.toLowerCase().replace(/\s+/g, '-');

// Handle image upload to Cloudinary
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

// Handle draft logic
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

// START FROM HERE

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

    try {
        // Ensure categoryId is normalized and exists
        const normalizedCategoryId = categoryId ? normalizeSlug(categoryId) : null;

        // Upsert the post
        const post = await prisma.post.upsert({
            where: { slug: normalizeSlug(slug) }, // Use the normalized slug to find the post
            update: {
                title,
                featureImage,
                content,
                description,
                crossPromote,
                podcastSingleCast,
                podcastMultiCast,
                selectedValue,
                paramsId,
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
                userId,
                postNiche,
                postSlug,
                categoryId: normalizedCategoryId, // Update the categoryId
            },
            create: {
                userId,
                title,
                featureImage,
                content,
                slug: normalizeSlug(slug),
                description,
                crossPromote,
                podcastSingleCast,
                podcastMultiCast,
                selectedValue,
                paramsId,
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
                categoryId: normalizedCategoryId, // Set the categoryId
            },
        });

        return post;
    } catch (error) {
        console.error('Error in upsertPost:', error);
        throw new Error('Failed to upsert post');
    }
}


// Upsert post in the database
// async function upsertPost(postData) {
//     const {
//         userId,
//         title,
//         featureImage,
//         content,
//         categorySlug,
//         author,
//         categories,
//         publishedChannels,
//         crossPromote,
//         podcastSingleCast,
//         podcastMultiCast,
//         isDraft,
//         slug,
//     } = postData;

//     try {
//         // Find or create categories
//         const categoryConnectOrCreate = categories.map((categorySlug) => ({
//             where: { slug: categorySlug },
//             create: { slug: categorySlug, title: categorySlug.replace(/-/g, ' ') }, // Create titles from slugs
//         }));

//         // Upsert the post
//         const post = await prisma.post.upsert({
//             where: { slug }, // Use the slug to find the post
//             update: {
//                 title,
//                 featureImage,
//                 content,
//                 categorySlug,
//                 author,
//                 publishedChannels,
//                 crossPromote,
//                 podcastSingleCast,
//                 podcastMultiCast,
//                 isDraft,
//                 categories: {
//                     deleteMany: {}, // Optionally clear existing categories
//                     connectOrCreate: categoryConnectOrCreate,
//                 },
//             },
//             create: {
//                 userId,
//                 title,
//                 featureImage,
//                 content,
//                 slug,
//                 categorySlug,
//                 author,
//                 categories: {
//                     connectOrCreate: categoryConnectOrCreate,
//                 },
//                 publishedChannels,
//                 crossPromote,
//                 podcastSingleCast,
//                 podcastMultiCast,
//                 isDraft,
//             },
//         });

//         return post;
//     } catch (error) {
//         console.error('Error in upsertPost:', error);
//         throw new Error('Failed to upsert post');
//     }
// }


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

    // Validate required fields
    if (!title || !featureImage || !content || !categories || !userId || !categorySlug || !slug) {
        return NextResponse.json({ success: false, message: "Please fill out all required fields." }, { status: 400 });
    }

    try {
        // Ensure categories is an array
        const categoriesArray = Array.isArray(categories) ? categories : [categories];

        // Normalize slugs
        const normalizedCategorySlugs = categoriesArray.map(normalizeSlug);
        const normalizedSlug = normalizeSlug(slug);

        // Upload feature image to Cloudinary if it's a base64 string
        const uploadedFeatureImage = await handleFeatureImageUpload(featureImage);

        // Upload content images to Cloudinary
        const updatedContent = await uploadContentImages(content);

        // Upsert post in the database
        const post = await upsertPost({
            userId,
            title,
            featureImage: uploadedFeatureImage,
            content: updatedContent,
            categorySlug: normalizeSlug(categorySlug),
            author: author.name,
            categories: normalizedCategorySlugs,
            publishedChannels,
            crossPromote,
            podcastSingleCast,
            podcastMultiCast,
            isDraft,
            slug: normalizedSlug,
        });

        // Handle draft logic
        await handleDraftLogic(post, isDraft);

        return NextResponse.json({ success: true, post });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    } finally {
        try {
            await prisma.$disconnect();
        } catch (error) {
            console.error('Error disconnecting Prisma Client:', error);
        }
    }
}
