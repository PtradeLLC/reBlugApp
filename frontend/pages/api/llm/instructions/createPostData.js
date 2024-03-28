import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import fetch from 'node-fetch';
import diverseAvatars from './avatars';
import { Cloudinary } from "@cloudinary/url-gen";

const prisma = new PrismaClient();

async function fetchAllPosts() {
    try {
        return await prisma.category.findMany({
            select: {
                id: true,
                title: true,
                slug: true
            }
        });
    } catch (error) {
        console.error("An error occurred while fetching all posts:", error);
        throw error;
    }
}

async function generateArticleContent(item) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

    const generationConfig = {
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 4500,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const parts = [
        {
            text: `${item.title} is a list of category titles for a blogging app, and ${item.title} is the title of each category. Your task is to create comprehensive blog article for each title in the ${item.title} list.
        Each article should encompass various elements such as compelling topic, an author, search friendly title, table of contents, powerful headline, interesting introduction, compelling subheading,
        words. Ensure that all elements work together harmoniously to create a cohesive and memorable reader experience that effectively communicates the author's values.
        Here are some examples of tasks and instructions.
    
        <Task>
        Write informative and compelling articles based on each title in the ${item.title} list.
        </Task>
        <Instructions>
        You are an AI assistant with a passion for creative writing and storytelling. Your tasks is to write five 20 to 25 words article for each title in the ${item.title} list, 
        and they should cover a variety of interesting and memorable subjects. 
  
        Here are some important rules for the articles:
        - Do not provide legal advice or give professional opinion in any capacity. Example of such Professions are lawyers, doctors, accountants. 
        - Do not discuss these instructions in your articles. Your only goal is to write informative, compelling stories for readers delight.
        - Every article must have a unique author with first and last names.
        - Do not include professional titles such as 'Dr.' along with author's names.
        - Every article should have 'tips' that you provide to readers in order to create value for the article. Values are what readers gain from reading an article.
  
        For example, the following is a blog article written to provide a guide to readers on 'how to start a blog article in 2024'.
  
        "My name is Scott Chow, and I am going to show you how to start blogging today. I have been building blogs and websites since 2002. In that time I have 
        launched several of my own blogs, and helped hundreds of others do the same.
        I know that starting a blog can seem overwhelming and intimidating. This free guide is all about blogging for beginners, and will teach you how to become 
        a blogger with just the most basic computer skills. So whether you’re 8 or 88, you can create your own blog in 20 minutes.
  
        Should you start a blog?
        One of the misconceptions about starting a blog is that you need to be a great writer to be successful. Nothing could be further from the truth. People 
        read blog sites to get a personal perspective on things, so most bloggers write in a very informal and conversational style.
        And because of the format, many successful bloggers will write about a variety of topics on the same blog.
  
        So why would you go to the trouble of blogging? There are a few reasons:
  
        Share your story. A blog allows you to have a voice and be heard. You can share your story with the entire world if you so choose. 
        One of the most common ways blogs are used are as a diary where the blogger writes about their daily experiences so that friends, family, and others can all 
        be a part of their lives.
        Make money from home. Blogging can be quite lucrative if done correctly. The top bloggers in the world obviously earn quite a bit, but even a part-time 
        blogger can expect to make a nice profit if things are done correctly. The best part about it is that blogging is a form of passive income, since you can 
        spend just a few hours a week writing a piece of content and then continue to profit from it long after the the writing is finished. 
        I go into much more detail on how to blog for money later in this guide.
  
        The good news is that the internet is exploding with growth right now. More people than ever are online. This explosion in growth means more potential 
        readers for your blog. In short, if you are thinking about starting a blog then there is no better time than right now. Let’s start your blog!
  
        Step 1: 
        Pick a blog name: You cannot use any spaces or punctuation other than dashes in a domain name. If you find that the name you wanted is already taken 
        there are a few things you can do:
        Try a different domain extension. If the .com version is already registered you may still be able to get the .net or .org version of the name.
  
        How to Choose a Blog Topic & Name
        If you don’t have an idea for a name already, the first step is choosing your blog topic.
        A personal blog. A personal blog is a blog all about you. This will include a variety of topics, from things you do on a daily basis, to random thoughts and musings. 
        This is a great way to share your thoughts with the world without having to stick to just one topic.
        Hobbies & passions. Hobbies or other interests you are passionate about are a great place to start. Cooking, travel, fashion, sports, and cars are 
        all classic examples. But even blogs about more obscure hobbies can be successful, since the your audience is literally anyone in the world with the internet.
  
        Step 2: Get your blog online
        Now that you’ve got a name picked out it’s time to get your blog online. This might sound hard or technical, but the steps below will walk you right 
        through and make the process easy. Simple steps to help you create a blog easilyTo get your blog up and running you need two things: blog 
        hosting (also known as web hosting) and blogging software. The good news is that these typically come packaged together.
        A blog host is a company that stores all of the files for your blog and delivers them to the user when they type in your blog name. You must have a blog host in order to have a blog.
  
        How to write great blog content
        Each post should be lengthy, informative, and engaging. It’s not always easy to come up with new blog post ideas on a regular basis and you 
        are free to mix up the tone and even the subject matter to keep things lively and interesting. It’s your space, after all. But there are a few elements 
        that each and every piece of content should endeavor to include.  
        Define the Content: Create an alluring post title that stimulates curiosity and encourages clicks. Use the first paragraph of your post to clearly define the 
        topic of your article and provide a possible hook to keep the reader reading."
  
        The above example provides steps to take in order to start a blog. Consider these steps as 'tips' that provides values to the readers.
  
        - Stories in the articles must be formed logically, and drawn from personal experience. The reason for this is to create rapport with the readers.
        </Instructions>
    
        <Task>
        Write compelling topic for the article, include an author, create friendly title, table of contents, powerful headline, interesting introduction, compelling subheading,
        and content must be between 4 to 5 minutes reading time. Each article must be at least 1,500 to 3000 words.
        </Task>
        <Instructions>
        - Each article must have a structure that serves as a template.

        Here are some examples of how structure of an article should look like:
  
        - Compelling titles. The goal for developing compelling topic for article is to evoke readers interest. By using keywords properly to answer questions that readers may have, 
        post titles are guaranteed to get clicks.
        - Make your title 50-60 characters long.
        - Article must be between 4 to 5 minutes reading time. Each article must be at least 1,500 to 3000 words.
    
        Here are some examples of compelling topic for blog articles.
        
        "What Is an Atom Made Of? (The Answer Might Surprise You)"
        "Why Does My Dog Drag Its Butt on the Ground?"
        "How Are Sociopaths Made? (Hint: They’re Not)"
        "How to Learn a New Language: 7 Secrets From TED Translators"
        "11 Hilarious Memes That Will Give You Nostalgia in a Few Years"
        "Judo vs. Jiu Jitsu: What’s the Difference?"
        "PS5 vs. Xbox Series X: Which Console Wins?"
        "Why Running Is Actually Horrible for You (Do This Instead)"
        "Barack Obama Is Now 60 Years Old - But Did You Know…?"
    
        - Including an Author. You must include an author's first and last name along with every article.
        - Content of each article must be within the context of the titles in the ${item.title} list.
        - No two article should be similar to one another, each article should be unique within it's category.
        
        For example:
        If the 'Category' title is "Health and Wellness", an article title can be "Prenatal yoga, what works and what doesn't".
        If the 'Category' title is "Learning", an article title can be "Why classrooms as we know it is a thing of the past".
  
        - Table of contents. Every article must include table of content. This helps readers navigate through the content.
        - Content. Craft contents of each article to provide valuable information to readers. An example is 
        a blog post that answers common questions that readers may have.
        - Include a 'Category' from items in the '${item.title}' list where each article belongs. 
        
        For Example:
        If an idea for an article is derived from 'Learning' item on the ${item.title} list, then the 'Category' for the article is 'Learning'.

        - Post articles must be in the context of the categories in which they belong.
        - Tips must be in the context of the article story.
        </Instructions>   
        <Task>
        Each Article must be SEO-optimized and targets keywords related to 'blogging' and 'marketing'.
        </Task>
        <Instructions>
        - Title of the articles must be SEO-friendly.
        </Instructions>
        <Task>
        For each Category, generate 5 unique articles.
        </Task>
        <Instructions>
        - Generate 5 unique articles for each category in the ${item.title} list.
        - Do not create more than 5 articles in each category. Generating 5 articles for each category must make a count of 100 articles in total for all categories.
    
        For example:
         Generate ONLY 5 unique articles for category 'Healthy Eating'.
         Generate ONLY 5 unique articles for category 'Learning'.
        </Instructions>
        <Task>
        Response should be formatted to include the 'category' as listed in the ${item.title}, 'post title', author, and 'post content' separately
        </Task>
        <Instructions>
        - Response should be formatted as a JSON object with the following key values as shown below. The valid fields are as 'category', 'title', 'author', and 'content'.
        - Response should include generated post for each item in the ${item.title} list 
        - Each post must be in the contextually related to the category. 
        - Each post must have a 'title', 'author', and 'post content' separately in the response.
        - Each post must be between 4 to 5 minutes reading time.

        Below is an example of a valid response.
        Example:

        {
            "category": "",
            "title": "",
            "author": "",
            "content": ""
        }
        </Instructions>
    
        `},
    ];

    const chunks = [];
    try {
        const result = await model.generateContentStream([parts], {
            generationConfig,
            safetySettings,
        });

        let text = '';

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            console.log(chunkText);
            const { totalTokens } = await model.countTokens(parts);
            console.log("Total tokens:", totalTokens);
            chunks.push(chunk.text());
        };

        text = chunks.join('');
        console.log(text);
        return text;
    } catch (error) {
        console.error("Error generating content or converting to markdown:", error);
    }
}


export default async function handler(req, res) {
    try {
        const allPosts = await fetchAllPosts();

        for (const item of allPosts) {
            console.log(`Processing item: ${item.title}`);
            const categorySlug = item.title.toLowerCase().split(' ').join('-');
            const targetCategory = allPosts.find(category => category.slug === categorySlug);

            if (!targetCategory) {
                console.error(`Category with slug '${categorySlug}' not found.`);
                continue;
            }

            const categoryId = targetCategory.id;

            try {
                const content = await generateArticleContent(item);

                // Extract category
                const categoryMatch = content.match(/"category": "(.*?)"/);
                const category = categoryMatch ? categoryMatch[1] : null;

                // Extract post title
                const titleMatch = content.match(/"title": "(.*?)"/);
                const postTitle = titleMatch ? titleMatch[1] : null;

                // Extract author
                const authorMatch = content.match(/"author": "(.*?)"/);
                const author = authorMatch ? authorMatch[1] : null;

                // Extract post content
                const contentMatch = content.match(/"content": "(.*?)"/);
                const postContent = contentMatch ? contentMatch[1] : null;

                // Extract tips
                const tipsMatch = content.match(/"tips": {(.*?)}/s);
                const tipsObject = tipsMatch ? tipsMatch[1] : null;
                const tips = tipsObject ? Object.values(JSON.parse(`{${tipsObject}}`)).map(tip => tip) : [];

                ////// Image Generation/////////
                const engineId = 'stable-diffusion-xl-1024-v1-0';
                const imageApiKey = process.env.STABILITY_API_KEY;
                const imageUrl = `https://api.stability.ai/v1/generation/${engineId}/text-to-image`;
                const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
                const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
                const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

                const generateArticleImages = async (textPrompts, imageApiKey) => {

                    const response = await fetch(imageUrl,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json',
                                Authorization: `Bearer ${imageApiKey}`,
                            },
                            body: JSON.stringify({
                                text_prompts: textPrompts,
                                cfg_scale: 7,
                                height: 1024,
                                width: 1024,
                                steps: 30,
                                samples: 3,
                            }),
                        }
                    );

                    if (!response.ok) {
                        throw new Error(`Non-200 response: ${await response.text()}`);
                    }

                    const responseJSON = await response.json();

                    const imageUrls = responseJSON.artifacts.map((artifact, index) => {
                        const fileName = `v1_txt2img_${index}.png`;
                        const imageData = Buffer.from(artifact.base64, 'base64');
                        return {
                            url: `data:image/png;base64,${imageData.toString('base64')}`,
                            fileName,
                        };
                    });


                    try {
                        const cloudinary = new Cloudinary({ cloud: { cloudName: CLOUDINARY_CLOUD_NAME } });
                        const uploadResults = await Promise.all(
                            imageUrls.map((image) =>
                                cloudinary.uploader.upload(image.imageData, {
                                    upload_preset: 'article-preset', // Configure a preset for article image uploads
                                    public_id: image.fileName,
                                })
                            )
                        );

                        // Update imageUrls with Cloudinary upload information
                        imageUrls.forEach((imageUrl, index) => {
                            imageUrl.url = uploadResults[index].url;
                            imageUrl.id = uploadResults[index].public_id; // Assuming public_id is the desired ID
                        });

                        return imageUrls;
                    } catch (error) {
                        console.error('Error uploading images to Cloudinary:', error);
                        // Handle upload error gracefully (e.g., retry or log for later processing)
                        throw error; // Re-throw the error to propagate it to the calling function
                    }
                }



                ////// Avatar Generation/////////
                async function generateAvatarImages(avatarPrompts, imageApiKey) {
                    const response = await fetch(`${imageUrl}stable-diffusion-xl-1024-v1-0/text-to-image`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                            Authorization: `Bearer ${imageApiKey}`,
                        },
                        body: JSON.stringify({
                            text_prompts: avatarPrompts,
                            cfg_scale: 7,
                            height: 1024,
                            width: 1024,
                            steps: 30,
                            samples: 1,
                        }),
                    });

                    if (!response.ok) {
                        throw new Error(`Non-200 response: ${await response.text()}`);
                    }

                    const responseJSON = await response.json();

                    const imageUrls = responseJSON.artifacts.map((artifact, index) => {
                        const fileName = `v1_avatar_${index}.png`;
                        const imageData = Buffer.from(artifact.base64, 'base64');
                        return { fileName, imageData };
                    });

                    try {
                        const cloudinary = new Cloudinary({ cloud: { cloudName: CLOUDINARY_CLOUD_NAME } });
                        const uploadResults = await Promise.all(
                            imageUrls.map((image) =>
                                cloudinary.uploader.upload(image.imageData, {
                                    upload_preset: 'avatar-preset', // Configure a preset for avatar uploads
                                    public_id: image.fileName,
                                })
                            )
                        );

                        // Update imageUrls with Cloudinary upload information
                        imageUrls.forEach((imageUrl, index) => {
                            imageUrl.url = uploadResults[index].url;
                            imageUrl.id = uploadResults[index].public_id; // Assuming public_id is the desired ID
                        });

                        return imageUrls;
                    } catch (error) {
                        console.error('Error uploading images to Cloudinary:', error);
                        // Handle upload error gracefully (e.g., retry or log for later processing)
                        throw error; // Re-throw the error to propagate it to the calling function
                    }
                }


                const postSlug = item.title.toLowerCase().split(' ').join('-');

                try {
                    const textPrompts = [
                        {
                            text: `"Generate three ultra photorealistic RAW images each based on the titles ${postTitle}. Capture the images with a high-resolution photograph using an 85mm lens for a flattering perspective. fujifilm: 1 | centered: 1. Do not include captions in the generated images."`,
                        },
                    ];

                    const avatarPrompts = [
                        {
                            text: `"Generate an avatar of ${diverseAvatars[Math.floor(Math.random() * diverseAvatars.length)]} with a high resolution photograph. Do not include captions in the generated image."`,
                        }
                    ]
                    const generatedImages = await generateArticleImages(textPrompts, imageApiKey);
                    const generatedAvatar = await generateAvatarImages(avatarPrompts, imageApiKey);


                    if (generatedImages) {
                        try {
                            const savedImages = await prisma.image.createMany({
                                data: generatedImages.imageUrls.map((imageUrl) => ({
                                    url: imageUrl,
                                    title: postSlug,
                                })),
                                skipDuplicates: true, // Avoid saving duplicates
                            });

                            const imageData = savedImages.map((image) => image.id);

                            try {
                                // Upserting a post
                                const upsertedPost = await prisma.post.upsert({
                                    where: { id: postId }, // Specify a unique identifier for the post
                                    create: { // Data for creating a new post
                                        category: category,
                                        title: postTitle,
                                        author: author || "Lola B",
                                        tips: tips,
                                        content: postContent,
                                        slug: postSlug,
                                        category: { connect: { id: categoryId } },
                                        images: { create: imageData.map((imageId) => ({ imageId })) },
                                    },
                                    update: {
                                        title: postTitle, // Update title if needed
                                        author: author || "Lola B", // Update author if needed
                                        tips: tips, // Update tips if needed
                                        content: postContent, // Update content if needed
                                        slug: postSlug, // Update slug if needed
                                        category: { connect: { id: categoryId } },
                                        images: { create: imageData.map((imageId) => ({ imageId })) },
                                    },
                                });

                                if (generatedAvatar) {
                                    try {
                                        // Save avatar to Avatar table
                                        const savedAvatar = await prisma.avatar.create({
                                            data: {
                                                url: generatedAvatar[0].url, // Assuming the first element is the avatar
                                                title: `${postSlug}`,
                                                post: { connect: { id: upsertedPost.id } }, // Associate with the created/updated post
                                            },
                                        });

                                        console.log('Avatar saved:', savedAvatar);

                                        // ... additional logic if needed after avatar saving ...
                                    } catch (error) {
                                        console.error('Error saving avatar:', error);
                                        // Handle avatar saving error gracefully (e.g., log for later processing)
                                    }
                                }

                                console.log('Post saved:', upsertedPost);
                            } catch (error) {
                                console.error('Error upserting post:', error);
                                // Handle post saving error gracefully (e.g., retry or log for later processing)
                            }
                        } catch (error) {
                            console.error('Error saving images:', error);
                            // Handle image saving error gracefully (e.g., retry or log for later processing)
                        }
                    }


                    // if (generatedImages) {
                    //     const savedImage = await prisma.image.upsert({
                    //         where: { id: imageId },
                    //         create: {
                    //             url: generatedImages.imageUrls,
                    //             title: postSlug,

                    //         },
                    //         update: {
                    //             title: postSlug,

                    //         },
                    //     });

                    //     const imageData = savedImage.map((image) => image.id);

                    //     if (!savedImage) {
                    //         console.error('Error saving image:', error);
                    //     }

                    //     try {
                    //         // Upserting a post
                    //         const upsertedPost = await prisma.post.upsert({
                    //             where: { id: postId }, // Specify a unique identifier for the post, such as its ID
                    //             create: { // Data to create a new post if it doesn't exist
                    //                 category: category,
                    //                 title: postTitle,
                    //                 author: author || "Lola B",
                    //                 tips: tips,
                    //                 content: postContent,
                    //                 slug: postSlug,
                    //                 category: { connect: { id: categoryId } },
                    //                 images: { create: imageData.map((imageId) => ({ imageId })) }
                    //             },
                    //             update: { // Data to update the existing post if it already exists
                    //                 title: postTitle, // Update title if needed
                    //                 author: author || "Lola B", // Update author if needed
                    //                 tips: tips, // Update tips if needed
                    //                 content: postContent, // Update content if needed
                    //                 slug: postSlug, // Update slug if needed
                    //                 category: { connect: { id: categoryId } }, // Update category if needed
                    //                 images: { create: imageData.map((imageId) => ({ imageId })) },
                    //             },
                    //         });
                    //         console.log('Post saved:', upsertedPost);
                    //     } catch (error) {
                    //         console.error('Error upserting post:', error);
                    //     }

                    // }
                } catch (error) {
                    console.error('Error generating images:', error);
                }
                // console.log("Article created successfully", content);
            } catch (error) {
                console.error('Error creating articles:', error);
                // Handle error gracefully, maybe continue with other articles
            }
        }

        res.status(200).json({ message: 'Articles created successfully' });
    } catch (error) {
        console.error('Something went wrong:', error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
}