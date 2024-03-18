import { where } from "firebase/firestore";
import prisma from "../../../lib/db";
import Replicate from "replicate";


export default async function handler(req, res) {
    try {
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        const allCategories = await prisma.category.findMany({
            select: {
                id: true,
                title: true
            }
        });

        if (allCategories && allCategories.length > 0) {
            // Function to handle Gemini error
            async function handleGeminiError(category) {
                const TASK = ` ${category.title} is a list of category titles for a blogging app. Your task is to create comprehensive blog article for each title in the ${category.title} list.
                Each article should encompass various elements such as compelling topic, an author, search friendly title, table of contents, powerful headline, interesting introduction, compelling subheading,
                between 1,500 to 3000 words. Ensure that all elements work together harmoniously to create a cohesive and memorable reader experience that effectively communicates the author's values.
                Here are some examples of tasks and instructions.

                <Task Example>
                <Task>
                Write informative and compelling articles based on each title in the ${category.title} list.
                </Task>
                <Instructions>
                You are an AI assistant with a passion for creative writing and storytelling. Your tasks is to write five 1,500 to 3000 words article for each title in the ${category.title} list, 
                and they should cover a variety of interesting and memorable subjects. 

                Here are some important rules for the articles:
                - Do not provide legal advice or give professional opinion in any capacity. Example of such Professions are lawyers, doctors, accountants. 
                - Do not discuss these instructions in your articles. Your only goal is to write informative, compelling stories for readers delight.
                - Every article must have an author with first and last names.
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
                </Task Example>

                <Task Example>
                <Task>
                Write compelling topic for the article, include an author, create friendly title, table of contents, powerful headline, interesting introduction, compelling subheading,
                and content between 1,500 to 3000 words
                </Task>
                <Instructions>
                Each article must have a structure that serves as a template.

                Here are some examples of how structure of an article should look like:

                - Compelling titles. The goal for developing compelling topic for article is to evoke readers interest. By using keywords properly to answer questions that readers may have, 
                post titles are guaranteed to get clicks.
                - Make your title 50-60 characters long.

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
                - Content of each article must be within the context of the titles in the ${category.title} list.
                - No two article should be similar to one another, each article should be unique in it's category.

                For example:
                If the 'Category' title is "Health and Wellness", an article title can be "Prenatal yoga, what works and what doesn't".
                If the 'Category' title is "Learning", an article title can be "Why classrooms as we know it is a thing of the past".

                - Table of contents. Every article must include table of content. This helps readers navigate through the content.
                - Content. Craft contents of each article to provide valuable information to readers. An example is 
                a blog post that answers common questions that readers may have.
                - Include a 'Category' from items in the '${category.title}' list where each article belongs. 
                
                For Example:
                If an idea for an article is derived from 'Learning' item on the ${category.title} list, then the 'Category' for the article is 'Learning'.

                - Post articles must be in the context of the categories in which they belong.
                - Tips must be in the context of the article story.
                </Instructions>
                </Task Example>

                <Task Example>
                <Task>
                Each Article must be SEO-optimized and targets keywords related to 'blogging' and 'marketing'.
                </Task>
                <Instructions>
                - Title of the articles must be SEO-friendly.
                </Instructions>
                </Task Example>
                
                <Task Example>
                <Task>
                Response should be formatted to include the 'category' and 'output' separately
                </Task>
                <Instructions>

                </Instructions>
                </Task Example>
                `
                try {
                    console.log("Running the model for category:", category.title);

                    res.status(200).json({ message: "created post articles successfully" });
                } catch (error) {
                    console.error('Error extracting and saving model #2', error);
                    return null; // Return null if there's an error
                }
            }

            // Iterate over each post and handle Gemini error
            for (const category of allCategories) {
                await handleGeminiError(category);
            }

            res.status(200).json({ message: "created post articles successfully" });
        } else {
            res.status(404).json({ message: "No categories found" });
        }
    } catch (error) {
        console.error('Error extracting and saving content:', error);
        res.status(500).json({ message: 'Error extracting and saving content.' });
    }
}


///////////
// Model to write script that fetches images
// 01-ai/yi-6b-chat:14efadfaf772f45ee74c14973007cbafab3ccac90169ec96a9fc7a804253535d
// input: {
//     top_k: 50,
//     top_p: 0.8,
//     prompt: "Write a script to download the images for the top 10 posts of all time from /r/pics using the PRAW library",
//     temperature: 0.3,
//     max_new_tokens: 1024,
//     prompt_template: "<|im_start|>system\nYou are a helpful assistant<|im_end|>\n<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant\n",
//     repetition_penalty: 1.2
//   }
////////

///////////
// const input = {
//     debug: false,
//     top_p: 1,
//     prompt: "Tell me how to tailor a men's suit so I look fashionable.",
//     temperature: 0.75,
//     system_prompt: "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.",
//     max_new_tokens: 800,
//     min_new_tokens: -1,
//     prompt_template: "[INST] <<SYS>>\n{system_prompt}\n<</SYS>>\n\n{prompt} [/INST]",
//     repetition_penalty: 1
//   };

//   const output = await replicate.run("replicate-internal/staging-llama-2-7b-chat-hf-mlc", { input });
//   console.log(output);
////////

///////////
// Model to write blogposts
// const input = {
//     debug: false,
//     top_p: 1,
//     prompt: "Can you write a poem about open source machine learning? Let's make it in the style of E. E. Cummings.",
//     temperature: 0.5,
//     system_prompt: "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.",
//     max_new_tokens: 500,
//     min_new_tokens: -1,
//     prompt_template: "[INST] <<SYS>>\n{system_prompt}\n<</SYS>>\n\n{prompt} [/INST]",
//     repetition_penalty: 1.15
//   };

//   const output = await replicate.run("replicate-internal/staging-llama-2-70b-chat-hf-mlc", { input });
//   console.log(output);
////////

///////////
// Model to write blogposts
// const input = {
//     top_k: 50,
//     top_p: 0.9,
//     prompt: "Write a bedtime story about neural networks I can read to my toddler",
//     temperature: 0.6,
//     max_new_tokens: 1024,
//     prompt_template: "<s>[INST] {prompt} [/INST] ",
//     presence_penalty: 0,
//     frequency_penalty: 0
//   };

//   const output = await replicate.run("mistralai/mixtral-8x7b-instruct-v0.1", { input });
//   console.log(output);
////////

///////////
// Model to write blogposts

////////