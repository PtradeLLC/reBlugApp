import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadContentImages = async (content) => {
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    let match;
    const replacements = new Map();

    while ((match = imgRegex.exec(content)) !== null) {
        const imgSrc = match[1];
        if (imgSrc.startsWith('data:') && !replacements.has(imgSrc)) {
            try {
                const uploadResult = await cloudinary.uploader.upload(imgSrc, {
                    folder: 'post/postBody',
                });
                replacements.set(imgSrc, uploadResult.secure_url);
            } catch (uploadError) {
                console.error('Error uploading image:', uploadError);
                // Handle upload error if necessary
            }
        }
    }

    let updatedContent = content;
    replacements.forEach((url, base64) => {
        updatedContent = updatedContent.split(base64).join(url);
    });

    return updatedContent;
};
