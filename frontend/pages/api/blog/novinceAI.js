import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export default async function handler(req, res) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Extract the content from the request body
        const { novice, ideasFormation } = req.body;

        // Check if the content is defined and not empty
        if (!novice && !ideasFormation) {
            throw new Error('Content is not provided.');
        }
        if (novice === "How do I construct a blog title that captures attention and entices readers?") {
            const run = async () => {
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

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

                const generationConfig = {
                    temperature: 0.4,
                    topK: 1,
                    topP: 1,
                };

                const parts = [
                    {
                        text: `Create an outline for a blog post.
                        Outline why the 'title' is important starting with 'Why Titles Matter', and how to construct 'title' for the blog post that is optimized for SEO including 'best practices'.
                        Generate a list of SEO optimized titles as an example. 
                        Briefly explain what 'SEO' is, and why it is important for the blog post.
                        
                        Do not include the this instructions in your response.
                        Keep your response ONLY to the context of 'how to construct blog post title'.

                        Outline why the 'title' is important.

                        Here is an example of how to construct a blog post title:
                        {
                            "title": "How to Construct a Blog Post Title",
                            "sections": [
                              {
                                "heading": "Why Titles Matter",
                                "content": [
                                  "Titles are the first thing that potential readers see, so they need to be attention-grabbing and informative.",
                                  "Titles also play a role in SEO, as they help search engines understand the content of your post.",
                                  "A well-crafted title can help your post rank higher in search results, which can lead to more traffic."
                                ]
                              },
                              {
                                "heading": "How to Construct a Title for SEO",
                                "content": [
                                  "Keep your title short and to the point.",
                                  "Use keywords that are relevant to your topic.",
                                  "Make sure your title is accurate and descriptive.",
                                  "Avoid using clickbait or misleading titles."
                                ]
                              },
                              {
                                "heading": "Best Practices",
                                "content": [
                                  "Use numbers in your title.",
                                  "Use strong verbs.",
                                  "Keep your title under 60 characters.",
                                  "Use a call to action."
                                ]
                              },
                              {
                                "heading": "What is SEO?",
                                "content": [
                                  "SEO stands for search engine optimization.",
                                  "It is the practice of improving the visibility and ranking of your website or blog in search engine results pages (SERPs).",
                                  "SEO is important because it can help you attract more traffic to your website or blog."
                                ]
                              },
                              {
                                "heading": "Examples of SEO Optimized Titles",
                                "content": [
                                  "10 Tips for Writing Blog Posts That Rank",
                                  "How to Write a Blog Post Title That Will Get You Noticed",
                                  "The Ultimate Guide to Blog Post Titles",
                                  "How to Write a Blog Post Title That Will Drive Traffic"
                                ]
                              }
                            ]
                          }
                        ` },
                ];

                // const result = await model.generateContent({
                //     contents: [{ role: "user", parts }],
                //     generationConfig,
                //     safetySettings,
                // });
                // const response = result.response;
                // const text = response.text();

                // console.log("ResponseLLL:", text);

                const result = await model.generateContent({
                    contents: [{ role: "user", parts }],
                    generationConfig,
                    safetySettings,
                });

                // Extract text from the response
                const responseText = result.response.text();

                // Construct the JSON response
                const responseData = {
                    titleData: responseText,
                };


                res.status(200).json({ titleData: responseData });
            }
            await run();
        } else if (novice === "How do I write blog content that is engaging and informative?") {
            const run = async () => {
                const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

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

                const generationConfig = {
                    temperature: 0.4,
                    topK: 1,
                    topP: 1,
                };

                const parts = [
                    {
                        text: `Write an outline for creating an engaging and informative blog post for 'novice' or 'beginner' level bloggers.
                        Expand on the content of the blog post, including why the content is important, and how to construct the blog post that is optimized for SEO.
                        Briefly explain 'Content Organization' - outline on how to organize the content including headings, subheadings, table of contents and bullet 
                        points, story and the order of the content.

                        Do not include the this instructions in your response.
                        `
                    },
                ];

                const result = await model.generateContent({
                    contents: [{ role: "user", parts }],
                    generationConfig,
                    safetySettings,
                });
                const response = result.response;
                const text = response.text();

                res.status(200).json({ data: text });
            }
            await run();
        } else if (novice === "How can I craft a blog conclusion that resonates with readers?") {
            const run = async () => {
                const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

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

                const generationConfig = {
                    temperature: 0.4,
                    topK: 1,
                    topP: 1,
                };

                const parts = [
                    {
                        text: `Respond with: 
                    "Let the author include your product or services in the next published article to loyal 
                    fans, and gain access to a dedicated audience of engaged readers who trust the author's 
                    recommendations. This exclusive opportunity allows you to showcase your brand in a positive 
                    light, drive traffic to your website, and generate leads from a highly targeted audience. 
                    Partner with this author today and elevate your brand's visibility among loyal and influential readers."

                     "Click on 'Submit product for future article' on the page and complete the form to get started."

                    Keep your response ONLY to the above sentences.
                    ` },
                ];

                const result = await model.generateContent({
                    contents: [{ role: "user", parts }],
                    generationConfig,
                    safetySettings,
                });
                const response = result.response;
                const text = response.text();

                console.log("ResponseLLL:", text);

                res.status(200).json({ data: text });
            }
            await run();
        }
    } catch (error) {
        console.error('Error extracting and saving content:', error);
        res.status(500).json({ message: 'Error extracting and saving content.' });
    }
}