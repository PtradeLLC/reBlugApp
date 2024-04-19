
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

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
            chunks.push(chunkText
                .replace(/\n/g, "")
                .replace(/##/g, "")
                .replace(/###/g, "")
                .replace(/```/g, "")
                .replace(/\*/g, "")
                .replace(/ \n\n/g, "")

            );
        };

        text = chunks.join('');
        const history = [];
        history.push(text);
        return text;
    } catch (error) {
        console.error("Error generating content or converting to markdown:", error);
        throw error;
    }
}

export default async function handler(req, res) {
    try {
        const allCategoryLists = await fetchAllPosts();

        if (!allCategoryLists || allCategoryLists.length === 0) {
            console.error("No posts found.");
            return res.status(404).json({ message: 'No posts found' });
        }

        for (const item of allCategoryLists) {
            const categorySlug = item.title.toLowerCase().split(' ').join('-');


            const targetCategory = allCategoryLists.find(category => category.slug === categorySlug);

            if (!targetCategory) {
                console.error(`Category with slug '${categorySlug}' not found.`);
                continue;
            }
            const categoryId = targetCategory.id;

            try {
                const content = await generateArticleContent(item);

                // Split the text into individual JSON objects
                const jsonObjects = content.match(/\{(?:[^{}]|(?:\{(?!\})|(?<!\{)\}))*\}/g);

                if (!jsonObjects) {
                    console.error("No JSON objects found in content.");
                    continue;
                }

                for (const jsonObject of jsonObjects) {
                    try {
                        const parsedContent = JSON.parse(jsonObject);

                        if (!parsedContent) {
                            console.error("Parsed content is null or undefined.");
                            continue;
                        }

                        // Extract data from parsedContent...
                        const category = parsedContent.category;
                        const postTitle = parsedContent.title;
                        const author = parsedContent.author;
                        const postContent = parsedContent.content;

                        if (!category || !postTitle || !postContent) {
                            console.error("Required fields are missing in parsed content:", jsonObject);
                            continue;
                        }

                        // Extract slug from post title
                        const postSlug = postTitle.toLowerCase().split(' ').join('-');

                        const uniquePost = { ...item, slug: postSlug };

                        // Check if postTitle is null or undefined before proceeding
                        if (!postTitle) {
                            console.error("Post title not found in content:", jsonObject);
                            continue;
                        }

                        const upsertedPost = await prisma.post.upsert({
                            where: { slug: uniquePost.slug },
                            create: {
                                category: category,
                                title: postTitle,
                                author: author || "Lola B",
                                content: postContent,
                                slug: postSlug,
                                category: { connect: { id: categoryId } },
                            },
                            update: {
                                title: postTitle, // Update title if needed
                                author: author || "Lola B", // Update author if needed
                                content: postContent, // Update content if needed
                                slug: postSlug, // Update slug if needed
                                category: { connect: { id: categoryId } },
                            },
                        });

                        // Delete posts with null content   
                        try {
                            const findDbPosts = await prisma.post.findMany({
                                where: {
                                    AND: [
                                        { category: { id: categoryId } },
                                        { content: null }
                                    ]
                                }
                            });

                            if (findDbPosts.length > 0) {
                                const deletePosts = await prisma.post.deleteMany({
                                    where: {
                                        AND: [
                                            { category: { id: categoryId } },
                                            { content: null }
                                        ]
                                    }
                                });
                                console.log("Deleted posts with null content:", deletePosts);
                            }
                        } catch (error) {
                            console.error("Error deleting posts:", error);
                        }
                        console.log('Post created successfully:', upsertedPost)

                    } catch (error) {
                        console.error('Error parsing JSON object:', error);
                        // Check if the error is due to unexpected non-whitespace character
                        if (error instanceof SyntaxError && error.message.includes('Unexpected non-whitespace character')) {
                            console.error('Error parsing JSON object:', error);
                            console.error('Skipping data with unexpected non-whitespace character:', jsonObject);
                            continue;
                        } else {
                            console.error('Error parsing content:', error);
                        }
                    }
                }
            } catch (error) {
                console.error('Error generating content:', error);
            }
        }
        res.status(200).json({ message: 'Articles created successfully' });
    } catch (error) {
        console.error('Something went wrong:', error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
}