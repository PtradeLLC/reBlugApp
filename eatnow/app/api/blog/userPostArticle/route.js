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





// import { PrismaClient } from '@prisma/client';
// import { NextResponse } from 'next/server';
// import { v2 as cloudinary } from 'cloudinary';
// import { uploadContentImages } from '../../../../utils/imageUtils';

// // Configure Cloudinary
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const prisma = new PrismaClient();

// export async function POST(request) {
//     if (request.method !== 'POST') {
//         return new NextResponse('Method Not Allowed', { status: 405 });
//     }

//     const {
//         userId,
//         title,
//         featureImage, // This will be a base64 or URL
//         content, // This may contain base64 images
//         categorySlug,
//         publishedChannels,
//         crossPromote,
//         podcastSingleCast,
//         podcastMultiCast,
//         isDraft,
//         slug,
//     } = await request.json();

//     try {
//         // Upload featureImage to Cloudinary
//         let uploadedFeatureImage = featureImage;
//         if (featureImage && featureImage.startsWith('data:')) {
//             const uploadResult = await cloudinary.uploader.upload(featureImage, {
//                 folder: 'post/coverImage',
//             });
//             uploadedFeatureImage = uploadResult.secure_url;
//         }

//         // Function to upload images within the content
//         const uploadContentImages = async (content) => {
//             const imgRegex = /<img[^>]+src="([^">]+)"/g;
//             let match;
//             const replacements = new Map();

//             while ((match = imgRegex.exec(content)) !== null) {
//                 const imgSrc = match[1];
//                 if (imgSrc.startsWith('data:') && !replacements.has(imgSrc)) {
//                     const uploadResult = await cloudinary.uploader.upload(imgSrc, {
//                         folder: 'post/postBody',
//                     });
//                     replacements.set(imgSrc, uploadResult.secure_url);
//                 }
//             }

//             let updatedContent = content;
//             replacements.forEach((url, base64) => {
//                 updatedContent = updatedContent.split(base64).join(url);
//             });

//             return updatedContent;
//         };

//         // Upload images within the content
//         const updatedContent = await uploadContentImages(content);

//         const post = await prisma.post.upsert({
//             where: {
//                 slug: slug, // Ensure that `slug` is a unique identifier in your schema
//             },
//             update: {
//                 title: title,
//                 featureImage: uploadedFeatureImage,
//                 content: updatedContent,
//                 categorySlug: categorySlug,
//                 publishedChannels: publishedChannels,
//                 crossPromote: crossPromote,
//                 podcastSingleCast: podcastSingleCast,
//                 podcastMultiCast: podcastMultiCast,
//             },
//             create: {
//                 userId: userId,
//                 title: title,
//                 featureImage: uploadedFeatureImage,
//                 content: updatedContent,
//                 categorySlug: categorySlug,
//                 publishedChannels: publishedChannels,
//                 crossPromote: crossPromote,
//                 podcastSingleCast: podcastSingleCast,
//                 podcastMultiCast: podcastMultiCast,
//                 isDraft: isDraft,
//                 slug: slug, // Ensure that the slug is included when creating a new post
//             },
//         });

//         return NextResponse.json({ success: true, post });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
//     }
// }