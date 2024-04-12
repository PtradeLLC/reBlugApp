import prisma from "../../../lib/db";

export default async function handler(req, res) {
    try {
        const {
            title,
            featureImage,
            content,
            crossPromote,
            selectedValue,
            selectedCategory,
            selectedFeatures,
            userInfo,
        } = req.body;

        const email = userInfo.email || 'support@reblug.com';
        const firstName = userInfo.firstName;
        const postSlug = title.toLowerCase().split(' ').join('-');

        const contactAuthor = () => {
            console.log("Author is contacted with:", email);
        };

        console.log("Feature Image: ", featureImage);

        const getAllCategories = await prisma.category.findMany({
            select: {
                id: true,
                title: true,
                slug: true,
            },
        });

        let selectedId = null;

        for (const category of getAllCategories) {
            if (category.slug === selectedCategory) {
                selectedId = category.id;
                break;
            }
        }

        if (!selectedId) {
            console.log("No category ID was matched");
            return res.status(400).json({ message: 'Invalid category selected.' });
        }

        // Upload the image to Cloudflare
        const uploadedImageResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
            },
            body: JSON.stringify({
                type: 'upload',
                file: featureImage, // Assuming featureImage is the image data
            }),
        });

        const uploadedImageData = await uploadedImageResponse.json();

        console.log("Uploaded Image Data: ", uploadedImageData);

        // Extract the URL of the uploaded image from the response
        const uploadedImageUrl = uploadedImageData.result.url;

        console.log("Uploaded Image URL: ", uploadedImageUrl);

        // Create or update the post in the database
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'User not found.' });
        }

        const postData = {
            title: title,
            featureImage: uploadedImageUrl, // Use the uploaded image URL
            content: content,
            published: true,
            email: email,
            views: 0,
            postSlug: postSlug,
            categoryId: selectedId,
            crossPromote: crossPromote,
            selectedValue: selectedValue,
            selectedFeatures: selectedFeatures,
            userId: user.id,
            updatedAt: new Date(),
        };

        const existingPost = await prisma.post.findFirst({
            where: {
                title: title,
                userId: user.id,
            },
        });

        if (!existingPost) {
            const newPost = await prisma.post.create({
                data: postData,
            });
            return res.status(200).json(newPost);
        } else {
            const updatedPost = await prisma.post.update({
                where: {
                    id: existingPost.id,
                },
                data: {
                    views: {
                        increment: 1,
                    },
                },
                select: {
                    id: true,
                    title: true,
                    content: true,
                    slug: true,
                    views: true,
                },
            });
            return res.status(200).json(updatedPost);
        }
    } catch (error) {
        console.error('Error extracting and saving content:', error);
        return res.status(500).json({ message: 'Error extracting and saving content.' });
    }
}



// import prisma from "../../../lib/db";
// const saltRounds = 12;

// export default async function handler(req, res) {
//     try {
//         const {
//             title,
//             featureImage,
//             content,
//             crossPromote,
//             selectedValue,
//             selectedCategory,
//             selectedFeatures,
//             userInfo, } = req.body;

//         const email = userInfo.email || 'support@reblug.com';
//         const firstName = userInfo.firstName;
//         const postSlug = title.toLowerCase().split(' ').join('-');

//         const contactAuthor = () => {
//             console.log("Author is contacted with:", email);
//         };

//         const getAllCategories = await prisma.category.findMany({
//             select: {
//                 id: true,
//                 title: true,
//                 slug: true
//             }
//         });

//         const lowerCaseCategory = selectedCategory.toLowerCase().split(' ').join('-');
//         let selectedId = null;

//         for (const category of getAllCategories) {
//             if (category.slug === lowerCaseCategory) {
//                 selectedId = category.id;
//                 break;
//             }
//         }

//         if (!selectedId) {
//             console.log("No category Id was matched");
//         } else {
//             console.log("Selected KEY", selectedId);
//         };

//         if (email) {
//             const user = await prisma.user.findUnique({
//                 where: {
//                     email: email,
//                 },
//             });

//             if (user) {
//                 // Check if the post already exists
//                 let existingPost = await prisma.post.findFirst({
//                     where: {
//                         title: title,
//                         userId: user.id,
//                     },
//                 });

//                 const hostedImage = await fetch(`https://api.cloudflare.com/client/v4/accounts/account_id/images/v2/direct_upload`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer undefined`,
//                     },
//                     body: JSON.stringify({
//                         "type": "upload",
//                         "file": featureImage
//                     })
//                         .then(response => response.json())
//                         .then(response => console.log(response))
//                         .catch(err => console.error(err))
//                 });

//                 if (!existingPost) {
//                     // If the post doesn't exist, create a new one
//                     const newPost = await prisma.post.create({
//                         data: {
//                             title: title,
//                             featureImage: featureImage,
//                             content: content,
//                             published: true,
//                             email: email,
//                             views: 0,
//                             postSlug: postSlug,
//                             categoryId: selectedId,
//                             crossPromote: crossPromote,
//                             selectedValue: selectedValue,
//                             selectedFeatures: selectedFeatures,
//                             userId: user.id,
//                             updatedAt: new Date()
//                         },
//                     });

//                     console.log("NEW POST from createPost", newPost);
//                     res.status(200).json(newPost);
//                 } else {
//                     // If the post exists, update the views count
//                     const updatedPost = await prisma.post.update({
//                         where: {
//                             id: existingPost.id,
//                         },
//                         data: {
//                             views: {
//                                 increment: 1,
//                             },
//                         },
//                         select: {
//                             id: true,
//                             title: true,
//                             content: true,
//                             slug: true,
//                             views: true,
//                             // likes: true,
//                         },
//                     });

//                     console.log("UPDATED POST from createPost", updatedPost);
//                     res.status(200).json(updatedPost);
//                 }
//             }
//         } else {
//             console.log('Invalid data provided');
//             res.status(400).json({ message: 'Invalid data provided.' });
//         }
//     } catch (error) {
//         console.error('Error extracting and saving content:', error);
//         res.status(500).json({ message: 'Error extracting and saving content.' });
//     }
// }