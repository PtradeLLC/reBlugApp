import prisma from "../../../lib/db";
import Replicate from "replicate";



export default async function handler(req, res) {
    try {
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        const allPosts = await prisma.post.findMany();

        if (allPosts && allPosts.length > 0) {
            // Function to handle Gemini error
            async function handleGeminiError(post) {
                const postTitle = post.title;

                try {
                    const output = await replicate.run(
                        "lucataco/realistic-vision-v5:8aeee50b868f06a1893e3b95a8bb639a8342e846836f3e0211d6a13c158505b1",
                        {
                            input: {
                                seed: 1335,
                                steps: 20,
                                width: 512,
                                height: 728,
                                prompt: `Generate RAW photos by using each item in ${postTitle} as 'keyword' that describes elements that should appear in the image`,
                                guidance: 5,
                                scheduler: "EulerA",
                                negative_prompt: "()"
                            }
                        }
                    );

                    // Update the post's featureImage if output is available
                    if (output) {
                        await prisma.post.update({
                            where: {
                                id: post.id,
                            },
                            data: {
                                featureImage: output,
                            },
                        });
                    }
                } catch (error) {
                    console.error('Error extracting and saving model #2', error);
                    return null; // Return null if there's an error
                }
            }

            // Iterate over each post and handle Gemini error
            for (const post of allPosts) {
                await handleGeminiError(post);
            }

            res.status(200).json({ message: "Updated post articles successfully" });
        } else {
            res.status(404).json({ message: "No posts found" });
        }
    } catch (error) {
        console.error('Error extracting and saving content:', error);
        res.status(500).json({ message: 'Error extracting and saving content.' });
    }
}