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
            userInfo, } = req.body;

        const email = userInfo.email || 'support@reblug.com';
        const firstName = userInfo.firstName;
        const postSlug = title.toLowerCase().split(' ').join('-');

        console.log("BODY", req.body);

        const contactAuthor = () => {
            console.log("Author is contacted with:", email);
        };

        const getAllCategories = await prisma.category.findMany({
            select: {
                id: true,
                title: true,
                slug: true
            }
        });

        console.log("AllCat", getAllCategories);

        const lowerCaseCategory = selectedCategory.toLowerCase().split(' ').join('-');
        let selectedId = null;



        for (const category of getAllCategories) {
            if (category.slug === lowerCaseCategory) {
                selectedId = category.id;
                break;
            }
        }

        if (!selectedId) {
            console.log("No category Id was matched");
        } else {
            console.log("Selected KEY", selectedId);
        };

        console.log("Selected ID", selectedId);


        // // Upload the image to Cloudflare
        // const uploadedImageResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
        //     },
        //     body: JSON.stringify({
        //         type: 'upload',
        //         file: featureImage,
        //     }),
        // });

        // const uploadedImageData = await uploadedImageResponse.json();

        console.log("Uploaded Image", uploadedImageData);

        // if (!uploadedImageData.success) {
        //     console.error('Image upload failed:', uploadedImageData.errors);
        //     return res.status(500).json({ message: 'Image upload failed.' });
        // }

        // Extract the URL of the uploaded image from the response
        // const uploadedImageUrl = uploadedImageData.result.url;


        if (email) {
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (user) {
                // Check if the post already exists
                let existingPost = await prisma.post.findFirst({
                    where: {
                        title: title,
                        userId: user.id,
                    },
                });

                if (!existingPost) {
                    // If the post doesn't exist, create a new one
                    const newPost = await prisma.post.create({
                        data: {
                            title: title,
                            featureImage: featureImage,
                            content: content,
                            published: true,
                            email: email,
                            featureImage: uploadedImageUrl,
                            views: 0,
                            postSlug: postSlug,
                            categoryId: selectedId,
                            crossPromote: crossPromote,
                            selectedValue: selectedValue,
                            selectedFeatures: selectedFeatures,
                            userId: user.id,
                            updatedAt: new Date()
                        },
                    });
                    res.status(200).json(newPost);
                } else {
                    // If the post exists, update the views count
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
                            // likes: true,
                        },
                    });

                    res.status(200).json(updatedPost);
                }
            }
        } else {
            console.log('Invalid data provided');
            res.status(400).json({ message: 'Invalid data provided.' });
        }
    } catch (error) {
        console.error('Error extracting and saving content:', error);
        res.status(500).json({ message: 'Error extracting and saving content.' });
    }
}