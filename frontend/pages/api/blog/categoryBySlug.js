import { PrismaClient } from "@prisma/client";
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";
import JSON5 from 'json5'

const prisma = new PrismaClient();

let tabs = [
    // { title: "Books and Literature", slug: "", image: "/booksimage.png" },
    // { title: "DIY and Crafts", slug: "", image: "/diyimage.png" },
    // { title: "Learning", slug: "", image: "/educationimage.png" },
    // { title: "Entertainment", slug: "", image: "/entertainmentimage.png" },
    // { title: "Pop Culture", slug: "", image: "/environmentimage.png" },
    // { title: "Environmentalism", slug: "", image: "/environmentimage.png" },
    // { title: "Fashion and Beauty", slug: "", image: "/fashionimage.png" },
    { title: "Finance", slug: "", image: "/financeimage.png" },
    { title: "Food and Cooking", slug: "", image: "/foodimage.png" },
    { title: "Health and Wellness", slug: "", image: "/healthimage.png" },
    // { title: "Lifestyle", slug: "", image: "/lifestyleimage.png" },
    // { title: "Parenting", slug: "", image: "/parentingimage.png" },
    // { title: "Photography", slug: "", image: "/photographyimage.png" },
    // { title: "Current Events", slug: "", image: "/politicsimage.png" },
    // { title: "Relationships", slug: "", image: "/relationshipsimage.png" },
    // { title: "Science and Technology", slug: "", image: "/scienceimage.png" },
    // { title: "Sports and Fitness", slug: "", image: "/sportsimage.png" },
    // { title: "Travel", slug: "", image: "/travelimage.png" },
];

export default async function handler(req, res) {
    try {
        // GEMINI LLM SETUP
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const safetySettings = [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        ];

        const generationConfig = {
            temperature: 0.3,
            topK: 1,
            topP: 1,
        };

        // Loop over the array, and create posts based on category title
        for (const tab of tabs) {
            const catSlug = tab.title.trim().split(" ").join("-").toLocaleLowerCase();
            const allAIPost = [];
            const postCat = tab.title;

            const parts = [
                {
                    text: `The following instructions are here for you to use as a guide while performing these tasks.
          Please use the following. You are an Author, skilled enough to be a 'best selling' author. You are tasked
          to come up with various ideas and stories, covering each of the items in the ${postCat} list above.
          
          Consider ${postCat} as 'category' list of a blogging website/ platform with each item serving a specific
          niche.
          
          1. Make a list of 18 viral interesting ideas for blog posts based on these category items in ${postCat} with six posts associated with each category in ${postCat}.
          For example:
          You would "generate ${2} blog posts in total for all the categories - with each category featuring ${2} articles each -

          "Books and Literature" will feature ${2} articles,  "DIY and Crafts" will feature ${2} articles, "Learning" will feature ${2} articles
          and so forth for the rest of the categories."

          2. Each item on the ${postCat} list will serve as a category in which each one of these
          ideas will be featured.
          3. Each of these ideas MUST BE distinctively unique, eye-catchy, and different from each other.
          3b. YOU MUST NOT write an article about the same subject, idea or topic twice.
          4. For each one of these ideas must be creative enough to grab readers attention.
          5. Each one of these ideas MUST BE used in 'Context' to an item in the ${postCat} list.
          6. Write a blog article based on the interesting ideas you developed for each one of the categories.
          7. For each one of the categories in the ${postCat} list, the idea must be personable, informative, and entertaining to say the least.
          
          8. You must develop different style of writing based on the category item in the list.
          
          For example, while an article in the "Books and Literature" might be entertaining and engaging, articles written for the
          "Health and Wellness" should be informative, and based on data and facts from credible sources.
          
          Refer to the following as guide for setting readers expectations, and the values they get from reading the articles.
          
          Title - [Values and expectations]
          "Expectations" denotes the values that readers get from reading the articles
          Example:
          
          a. "Books and Literature" - [Entertaining, Engaging]
          b. "DIY and Crafts" - [Informative, educational]
          c. "Learning" - [Educational, Informative]
          d. "Entertainment" - [Interesting, entertaining, Engaging, Funny]
          e. "Pop Culture" - [Insightful, entertaining, Engaging]
          f. "Fashion and Beauty" - [Creative, entertaining, Engaging]
          g. "Finance" - [Informative, Current, Engaging]
          h. "Food and Cooking" - [Informative, Fun, ]
          i. "Health and Wellness" - [Educational, Informative, Engaging]
          j. "Lifestyle" - [Interesting, entertaining, Engaging]
          k. "Parenting" - [Informative, Supportive, eye opening, reflective]
          l. "Photography" - [Creative, Informative, Engaging]
          m. "Current Events" - [Interesting, Current, Engaging, Entertaining, Informative]
          n. "Relationships" - [Interesting, entertaining, Engaging]
          o. "Science and Technology" - [Informative, Educational, Informative, Current]
          p. "Sports and Fitness" - [Engaging, Informative]
          q. "Travel" - [Interesting, Informative, Engaging, experience, reflective]
          
          These are example of writing styles that you can use for differentiating each article in each category.
          
          Category: 'Science and Technology'
          
          'Article Title': '5 Common Mistakes Every Junior Developer Makes'
          'Readers expectations': [Informative, Engaging]
          
          'Content': 
          "
          We all make mistakes, and these are the mistakes that elevate us to the position of senior developer, and overcoming these mistakes elevates us to the level of experienced developer.

                    Also, throughout my early days, I made numerous mistakes, and as a result, if my junior makes a mistake, I will not turn down his or her potential or skills since I understand that it's normal.However, making mistakes repeatedly and failing to learn from them is a huge red flag.🚩
                    So now I'm going to share my top 5 mistakes that I wish someone had pointed out to me during my initial days of software development. 💻🔍
                    Ignoring Feedback :
                    We have provided feedback in a variety of formats, like code reviews, in group meetings, and individual conversations etc., but we developers will deny it, claiming that it is all garbage, they are jealous of me,  they are exaggerating, or we took it too personally.
                    Please never fall into this trap. Put your ego aside for a few minutes and write down your notes, focusing on the ones you believe are most significant.Whenever you receive unfavorable criticism, take a step back and think about how these changes will help you advance as a software developer.
                    
                    Learning Too Many Programming Languages:
                    Keeping up with the latest information is beneficial, but studying too much can cause problems.
                    This was the worst mistake I have made in my life.Back then, I learned React, React-Native, Flutter, Android, Vuejs, Nodejs, Mongodb, Cordova, Electronjs, Machine Learning(Numpy, Pandas, Scikit learn, Pytorch) Django,Flask and a variety of other tools, and 70% of these technologies aren't even required for my job.
                    Instead of focusing solely on coding, I believe it is beneficial to collaborate with other developers, mentor others, improve communication skills, build a network, learn a musical instrument, participate in sports, and pursue other interests.
                    Our lives are not solely about code.Create stories and memories that you will remember in your old age.
                    
                    Not vocalizing your work
                    Personally, I've found that a person who is an average developer but is really good at vocalizing their work in front of others is more effective than a person who is very intelligent coder but expects their managers and team leaders already know that he/she is talented.
                    I'll use the example of my two colleagues, Kim and Jeon. Kim is a type of person who begins working on the task that the team lead or manager assigned to it, whereas Jeon is a type of person who first discusses the scope of that task, then discusses how much time it takes by explaining why it takes that much time (he always adds 2 hours extra for his safety), then discusses the approach, starts working, and hands over before time sometimes because he added an extra 2 hours and sometimes on time.
                    
                    Now consider who is going to rise more in that firm ?
                    According to me, it's certainly Jeon since he pretends to be intellectual despite the fact that he's an average software developer, but Kim, who is quite intelligent, just becomes an average person in front of their team leader or project manager.
                    Don't depend on QA or tester's:
                    I hate testers, literally!!They don't even test the point I uploaded to the staging server; instead, they make their own speculative assumptions, such as:
                    * What if I click this button 100 times ?
                    * Why my payment is deducted from dummy card and not reflected on project when I refresh the page in between payment processing.
                    * It's not working on my computer? (Removing the cache is straightforward, but they have the audacity to wonder why it isn't functioning.)
                    So, if I finish my task before the time, I will make sure to test all of the scenarios so that it has minimal impact on live users.
                    
                    Lack of Defining our Future Goals :
                    Instead of relying solely on your company, set future goals such as :
                    * Determining the finest technologies for your future needs.
                    * How long would I stay with this company? (I believe staying in a single firm might lead to boredom and a lack of new experiences. Instead, choose a company with intelligent employees  than you.) 
                    * Should you start your own business?
                    * What areas do I need to improve? Going into your software career blindly and without a plan can impede your professional development. You may be unsure about where you are heading or what your future aspirations are.
                    
                    Without formulating your own plan, you may end up stuck in the same junior-level position for years.So start working on it. Invest a minimum of 5-10% of your everyday time in this.
                    That's it for this blog. I hope my experiences may help others, and please share your thoughts, which will undoubtedly help me or others to improve.
          "
          
          9. You MUST generate random full names as the 'Authors' of each article. 
          9b. DO NOT use professional titles such as "Dr." or provide legal advice in any of the articles.
          10. You MUST generate random "related" images for "Feature Image" of each article.
          11. You MUST generate random "related" images for the "Content" of each article.
          11a. The images MUST BE in the context of the articles. For example, an image of "Crowded train" might be generated 
          for an article about "Solving transportation issues".
          12. Write engaging full blog article of 1,014 words for each the idea in each category.
          13. Refer to an experience you had related to the subject matter - a short story that readers can relate to. Be sure that the story is in the context of the article.
          13b. Keep the experience story short, engaging, funny, and perhaps reflective.
          13c. Try as often as you can to expand on the context within the article to provide 'tips' for readers. 
          For example:
          If you write about Artificial Intelligence in Technology, and touch on this point within the article:

          " As AI continues to advance, it is important to consider the ethical implications of its use. 
          Some of the key ethical concerns include:
          Job displacement: AI could potentially automate many tasks currently performed by humans, leading to job losses.
          Bias: AI algorithms can be biased, leading to unfair or discriminatory outcomes.
          Privacy: AI systems can collect and process vast amounts of data, raising concerns about privacy and data security.
          "
          You should also provide useful tips on how readers can up-skill to avoid losing their jobs to AI or how to protect 
          themselves from bias AI algorithms, and perhaps privacy related concerns.

          14. Refrain from using the same style of content creating to create viral ideas. 
          For example: 
          The ideas created below are similar in the way the ideas are formed:
          1. Books and Literature: "Unveiling the Hidden Gems: 5 Underrated Books That Will Captivate Your Soul"
          2. DIY and Crafts: "Transform Your Home with 10 Easy DIY Projects That Will Impress Your Guests"
          3. Learning: "Unlock Your Potential: 7 Proven Techniques to Enhance Your Learning Abilities"
          4. Entertainment: "The Ultimate Guide to Binge-Watching: 10 TV Shows That Will Keep You Hooked from Start to Finish"
          
          "5 Underrated Books That Will Captivate Your Soul"
          "10 Easy DIY Projects That Will Impress Your Guests"
          "7 Proven Techniques to Enhance Your Learning Abilities"
          "10 TV Shows That Will Keep You Hooked from Start to Finish"

          Find creative ways to come up with engaging blog article ideas.
          Your answers should be professional and consistent.
          
        Below is an example of how the data should be returned:

           Sample document representing a document in the MongoDB collection
            {
                "title": "The Great Gatsby",
                "author": "Scott Fitzgerald",
                "content": "This is a long body of text",
                "category": "Entertainment",
                "is_available": true,
                "publisher": {
                    "name": "Scribner",
                    "location": "New York"
                },
                "tips": [
                    {
                        "first_tip": "This is tip number one",
                        "second_tip": "This is tip number two"
                    },
                ]
            }
            Refrain from using characters like '**', '*', '#' or any other non-string characters.
            You may use numbers to denote ordered list items.

          `}];

            try {
                const result = await model.generateContent({
                    contents: [{ role: "user", parts }],
                    generationConfig,
                    safetySettings,
                });

                const response = result.response;
                const text = response.text();

                const categories = [];
                let currentCategory = null;

                const lines = text.split('\n');
                // console.log('Lines::', lines);

                const originalText = lines;
                const filteredArray = originalText.split('').filter(char => char !== '*' && char !== '-');
                const modifiedText = filteredArray.join('');
                console.log(originalText);

                // Assuming posts is the array of dynamically generated article posts
                for (const line of lines) {
                    // console.log('Line', line);
                    try {
                        // const dbCategory = await prisma.category.upsert({
                        //     where: { slug: catSlug },
                        //     update: {},
                        //     create: {
                        //         title: postCat,
                        //         slug: catSlug,
                        //         image: tab.image,
                        //     },
                        // });

                        // Extract information from the post object
                        const title = postCat;
                        const author = line.Author;
                        const featureImage = line.image;
                        const content = line.Content;

                        console.log(title, author, featureImage, content);

                        // Store the extracted information in the database
                        // await prisma.post.create({
                        //     data: {
                        //         title,
                        //         author,
                        //         featureImage,
                        //         content,
                        //         tips,
                        //         slug: catSlug,
                        //         category: { connect: { slug: dbCategory.slug } },
                        //     },
                        // });

                        console.log(`Post '${title}' stored successfully`);
                    } catch (error) {
                        console.error('Error processing post:', error);
                    }
                }

                // Iterate over the extracted categories and posts
                // for (const category of categories) {
                //     try {
                //         // Create or update the category in the database
                //         const dbCategory = await prisma.category.upsert({
                //             where: { slug: catSlug },
                //             update: {},
                //             create: {
                //                 title: postCat,
                //                 slug: catSlug,
                //                 image: tab.image,
                //             },
                //         });

                //         console.log(dbCategory);

                //         for (const post of category.posts) {
                //             console.log(post);
                //             await prisma.post.create({
                //                 data: {
                //                     title: post.title,
                //                     author: post.author,
                //                     featureImage: post.featureImage,
                //                     content: post.content,
                //                     slug: catSlug,
                //                     category: { connect: { id: dbCategory.id } },
                //                 },
                //             });
                //         }
                //     } catch (error) {
                //         console.error('Error processing category or post:', error);
                //     }
                // }
                console.log('Data stored successfully');

                // Respond with success message
                return res.status(200).json({ message: "Content generation was completed successfully" });

            } catch (error) {
                console.error('Error generating content:', error);
                return res.status(500).json({ error: 'Error generating content' });
            }
        };
    } catch (error) {
        console.error("Error creating or fetching categories:", error);
        res.status(500).json({ message: "Error creating or fetching categories." });
    }
}