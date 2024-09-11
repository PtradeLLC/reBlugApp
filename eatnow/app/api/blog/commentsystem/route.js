import { PrismaClient } from '@prisma/client';
import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


//GET Request
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const postId = searchParams.get('postId');
        const postTitle = searchParams.get('postTitle');

        const getTitle = postTitle.trim().split(/\s+/).join('-').toLowerCase();


        if (!postId || !postTitle) {
            return NextResponse.json({ message: "Post ID and Post Title are required." }, { status: 400 });
        }

        const comments = await prisma.comment.findMany({
            where: {
                postSlug: getTitle,
                title: postTitle
            },
            include: { user: true },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        return NextResponse.json({ message: "Error fetching comments.", error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

//POST REQUEST
export async function POST(req) {
    try {
        const { comment, content, email, postTitle, postId, name } = await req.json();

        if (!email || !postId || !comment || !name || !postTitle) {
            console.error("Missing required fields:", { email, postId, comment, name });
            return NextResponse.json({ message: "Invalid data provided." }, { status: 400 });
        }

        const [user, post] = await Promise.all([
            prisma.user.findUnique({
                where: { email },
                select: { id: true, firstName: true, name: true },
            }),
            prisma.post.findUnique({
                where: { id: postId },
            })
        ]);

        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }

        if (!post) {
            return NextResponse.json({ message: "Post not found." }, { status: 404 });
        }

        const userName = name.split(" ")[0] || user.name || user.firstName || "Anonymous";
        const postSlug = postTitle.toLowerCase().replace(/\s+/g, "-");

        const aiResponse = await generateAIResponse(comment, content, userName);

        const createdComment = await prisma.comment.create({
            data: {
                title: postTitle,
                content: comment,
                aiResponse,
                postSlug,
                userEmail: email,
                userId: user.id,
            },
            include: {
                user: true,
            },
        });

        // console.log("AI Comment:", createdComment);
        return NextResponse.json({ message: "data is created successfully" });
    } catch (error) {
        console.error("Error processing comment:", error);
        return NextResponse.json({ message: "Error processing comment.", error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

async function generateAIResponse(userPrompt, content, userName) {
    const systemPrompt = `
    Please use the following instructions to respond to the 'comment' or 'question' that the user is posting about the page article, and when responding to the 
    user and providing an answer, do the following:
    1. Provide a concise and informative answer (no more than 50 words) for a given comment.
    2. Provide answers with credible sources.
    3. Refer to the user by '@${userName}'. For example, If User's name is 'Jon', then refer to the user as '@Jon'.
    4. Do not repeat text. 
    5. If you are uncertain or concerned about your response to a 'comment' or 'question', say that 'you will let the author know about the question or comment, 
    and can circle back to the user with accurate information. Ask if the user wants to reach out to the author'.
    6. An example of a 'question' is "How do I craft a compelling blog article?".
    6a. An example of a 'comment' is "This article is insightful".
    7. If user asks a 'question', respond back with a thoughtful, researched answer, and if user posts a 'comment', respond back with gratitude.
    8. If user posts a question or comment in 'First Person singular Pronoun' e.g: "How do I Craft Compelling Content for my blog?", respond back with
    'Second Person Pronoun" e.g: "How can you craft compelling content for your blog?"
    9. Information in your response MUST be up-to-date. If you are uncertain, let the user know that you can 
    get an accurate response from the article author.
    10. If user posts comment referencing the page article, please refer to the button on the page labelled 'Chat with this Article'.
    11. Use the provided content as context to provide your answers, but keep it brief.
    12. If user asks about the article or blog, use '${content}' as the knowledge base or article or blog.
    `;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            model: "llama-3.1-70b-versatile",
            temperature: 0.7,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
            stop: null
        });

        return chatCompletion.choices[0]?.message?.content || '';
    } catch (error) {
        console.error("Error generating AI response:", error);
        return "I apologize, but I'm unable to provide a response at the moment. Please try again later.";
    }
}

async function contactAuthor(email) {
    console.log("Author is contacted");
    // TODO: Implement actual email sending logic here
    // For example:
    // await sendEmail({
    //     to: email,
    //     subject: 'New comment on your article',
    //     body: 'You have received a new comment on your article. Please check your dashboard.'
    // });
}