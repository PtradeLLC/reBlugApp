import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Function to fetch all categories
async function fetchAllPosts() {
    try {
        const allCategories = await prisma.category.findMany({
            select: {
                id: true,
                title: true,
                slug: true
            }
        });

        if (!allCategories.length) {
            throw new Error('No categories found');
        }

        return allCategories;
    } catch (error) {
        console.error("An error occurred while fetching all posts:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// GET handler for the API route
export async function GET(req, res) {
    try {
        const categories = await fetchAllPosts();

        const prompt = `
    Here are some tasks and instructions.
    
    <Task>
    Write informative and compelling articles based on each title in the  list.
    </Task>
    <Instructions>
    You are an AI assistant with a passion for creative writing and storytelling. Your tasks is to write five 20 to 25 words article for each title in the list, 
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
    "11 Hilarious New Year's Resolutions You'll Actually Want to Keep"
    "How a Puppy Could Save Your Relationship"
    </Instructions>
    `;

        // This is where you can call the AI content generation function if needed

        return NextResponse.json({ message: 'Categories fetched successfully', categories });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
