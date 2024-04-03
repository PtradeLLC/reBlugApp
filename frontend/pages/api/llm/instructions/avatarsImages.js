import fetch from 'node-fetch';
import { PrismaClient } from '@prisma/client';
import { Storage } from '@google-cloud/storage';
import { Leap } from "@leap-ai/workflows";
const fs = require('fs');

const projectId = process.env.G_PROJECT_ID;

const storage = new Storage();
const prisma = new PrismaClient();

const diverseAvatars = [
    {
        gender: 'Male',
        ethnicity: 'Caucasian',
        skinTone: 'Fair',
        hairDescription: 'Short brown hair, styled casually',
        accessories: ['Rectangular glasses'],
        expression: 'Warm smile, dimples visible'
    },
    {
        gender: 'Female',
        ethnicity: 'African American',
        skinTone: 'Dark',
        hairDescription: 'Curly black hair pulled back into a neat bun',
        accessories: ['Bold, round earrings'],
        expression: 'Confident expression with a slight smirk'
    },
    {
        gender: 'Male',
        ethnicity: 'Hispanic',
        skinTone: 'Olive',
        hairDescription: 'Short, dark hair neatly combed to the side',
        accessories: [],
        expression: 'Friendly gaze, showing a toothy grin'
    },
    {
        gender: 'Female',
        ethnicity: 'Asian',
        skinTone: 'Light',
        hairDescription: 'Silky, straight black hair falling over one shoulder',
        accessories: ['Delicate stud earrings'],
        expression: 'Gentle smile, eyes slightly squinted in a friendly manner'
    },
    {
        gender: 'Male',
        ethnicity: 'African',
        skinTone: 'Deep ebony',
        hairDescription: 'Close-cropped hair with a defined hairline',
        accessories: ['Traditional patterned shirt'],
        expression: 'Confident posture, looking directly at the camera with pride'
    },
    {
        gender: 'Female',
        ethnicity: 'Caucasian',
        skinTone: 'Rosy',
        hairDescription: 'Long, flowing blonde hair with loose curls',
        accessories: [],
        expression: 'Radiant smile, exuding warmth and approachability'
    },
    {
        gender: 'Male',
        ethnicity: 'East Asian',
        skinTone: 'Light',
        hairDescription: 'Short, jet-black hair styled neatly',
        accessories: ['Wireframe glasses'],
        expression: 'Expressive eyes, conveying intelligence and kindness'
    },
    {
        gender: 'Female',
        ethnicity: 'Hispanic',
        skinTone: 'Caramel',
        hairDescription: 'Shoulder-length curly brown hair with highlights',
        accessories: ['Hoop earrings'],
        expression: 'Bright, inviting smile, showcasing a friendly demeanor'
    },
    {
        gender: 'Male',
        ethnicity: 'South Asian',
        skinTone: 'Olive',
        hairDescription: 'Thick, dark hair styled in a modern undercut',
        accessories: [],
        expression: 'Confident expression, with a subtle smirk'
    },
];


// function convertArrayOfObjectsToCSV(array) {
//     let result = '';
//     const headers = Object.keys(array[0]);
//     result += headers.join(',') + '\n';

//     array.forEach(item => {
//         const values = headers.map(header => {
//             let value = item[header];
//             if (Array.isArray(value)) {
//                 value = value.join(';'); // if the value is an array, join its elements with a semicolon
//             }
//             return value;
//         });
//         result += values.join(',') + '\n';
//     });

//     return result;
// };

// const csv = convertArrayOfObjectsToCSV(diverseAvatars);

// function writeCSVToFile(csv, filePath) {
//     fs.writeFile(filePath, csv, (err) => {
//         if (err) {
//             console.error('Error writing CSV file:', err);
//             return;
//         }
//         console.log('CSV file saved successfully:', filePath);
//     });
// }

// // Example usage:
// const filePath = "./avatarOutput.csv";
// writeCSVToFile(csv, filePath);


// const uploadImage = async (bucketName, fileName, imageData) => {

//     try {
//         // Upload the image data to Cloud Storage
//         await file.save(imageData, {
//             contentType: 'image/png',
//         });
//         console.log(`Image ${fileName} uploaded to bucket ${bucketName}`);

//         // Get the public URL of the uploaded image
//         const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
//         return publicUrl;
//     } catch (error) {
//         console.error('Error uploading image:', error);
//         throw error; // Rethrow the error to handle it in the calling function
//     }
// };

const generateAvatar = async () => {
    try {
        const imageUrl = `https://api.workflows.tryleap.ai/v1/runs/bulk`;

        const leap = new Leap({
            apiKey: "le_8933a399_d7D8ipjxg0X1iBkwCVETAtGb",
        });

        const response =
            await leap.bulkWorkflowRuns.runBulk({
                workflow_id: "wkf_B5vqoEqxfCkpWy",
                input_csv_url: "http://localhost:3000/api/llm/instructions/avatarOutput.csv",
            });
        // const response = await fetch(imageUrl, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Accept: 'application/json',
        //         Authorization: `Bearer ${process.env.LEAP_API_KEY}`,
        //         'X-Api-Key': `${process.env.LEAP_API_KEY}`,
        //     },
        //     body: JSON.stringify(
        //         {
        //             "workflow_id": `${process.env.LEAP_WORKFLOW_ID}`,
        //             "input_csv_url": "./avatarOutput.csv",
        //         }
        //     ),
        // });

        if (!response.ok) {
            throw new Error(`Non-200 response: ${await response.text()}`);
        }
        const data = await response.json();

        return response.data;

    } catch (error) {
        console.log(error);
    }
};


// const createPostAvatars = async () => {
//     const jsonImage = JSON.stringify(diverseAvatars, null, 2);

//     try {
//         const textPrompts = [
//             {
//                 text: `"Generate an ultra 8k photorealistic RAW portrait image based on ${jsonImage}. Capture the images with a high-resolution photograph using an 85mm lens for a flattering perspective. fujifilm: 1 | centered: 1. Do not include captions in the generated images."`,
//             },
//         ];
//         return textPrompts;
//     } catch (error) {
//         console.log(error);
//     }
// };

export default async function handler(req, res) {
    try {
        const posts = await prisma.post.findMany();

        // Extract unique author names
        const uniqueAuthors = [...new Set(posts.map(post => post.author))];

        // Generate avatars for unique authors in parallel
        const avatarPromises = uniqueAuthors.map(async author => {
            // const textPrompts = await createPostAvatars(author);
            const avatar = await generateAvatar();
            console.log('AVATARRRRR', avatar);

            // Upload the generated image to Cloud Storage
            // const imageUrl = await uploadImage('reblug-images', avatar.fileName, avatar.data);

            // Return the avatar data with the Cloud Storage URL
            // return { ...avatar, imageUrl };
        });

        // Wait for all avatar generation tasks to complete
        // const avatars = await Promise.all(avatarPromises);

        // // Batch database operations for creating avatars and associating them with posts
        // const avatarCreatePromises = avatars.map(avatar => prisma.avatar.create({ data: avatar }));
        // const avatarOnPostCreatePromises = avatars.map(avatar => {
        //     return prisma.avatarOnPost.create({
        //         data: {
        //             avatar: { connect: { id: avatar.id } },
        //             post: { connect: { id: avatar.postId } }
        //         }
        //     });
        // });

        // Execute batched database operations
        // await Promise.all([...avatarCreatePromises, ...avatarOnPostCreatePromises]);

        res.status(200).json({ message: 'Avatars created and associated with posts successfully' });
    } catch (error) {
        console.error('Error creating avatars:', error);
        res.status(500).json({ error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}