import { PrismaClient } from '@prisma/client';
import { JSDOM } from 'jsdom';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        // Extract the URL from the request body
        const { url } = req.body;

        console.log("URL", url);

        // Check if the URL is defined and not empty
        if (!url) {
            throw new Error('URL is not provided or empty.');
        }

        // Send an HTTP request to the provided URL using fetch
        const response = await fetch(url);
        const htmlContent = await response.text();

        console.log("HTMLContent", htmlContent);

        // Create a new JSDOM instance and parse the HTML content
        const dom = new JSDOM(htmlContent);
        const { document } = dom.window;

        // Identify the main content section using appropriate DOM manipulation methods
        const mainContent = document.querySelector('main');

        // Extract paragraphs from the main content section
        const paragraphs = Array.from(mainContent.querySelectorAll('p')).map(p => p.textContent);

        console.log('Paragraph', paragraphs);

        // Save the extracted paragraphs to the database using Prisma
        await prisma.paragraphs.createMany({
            data: paragraphs.map(text => ({ text })),
        });

        res.status(200).json({ message: 'Content extracted and saved successfully.' });
    } catch (error) {
        console.error('Error scraping and extracting content:', error);
        res.status(500).json({ message: 'Error scraping and extracting content.' });
    }
}




// import { PrismaClient } from '@prisma/client';
// import axios from 'axios';
// import { JSDOM } from 'jsdom';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//     try {
//         // Extract the URL from the request body
//         const { url } = req.body;

//         // Send an HTTP request to the provided URL
//         const response = await axios.get(url);
//         const htmlContent = response.data;

//         console.log("HTMLContent", htmlContent);

//         // Create a new JSDOM instance and parse the HTML content
//         const dom = new JSDOM(htmlContent);
//         const { document } = dom.window;

//         // Identify the main content section using appropriate DOM manipulation methods
//         const mainContent = document.querySelector('main');

//         // Extract paragraphs from the main content section
//         const paragraphs = Array.from(mainContent.querySelectorAll('p')).map(p => p.textContent);

//         console.log('Paragraph', paragraphs);

//         // Save the extracted paragraphs to the database using Prisma
//         await prisma.paragraphs.createMany({
//             data: paragraphs.map(text => ({ text })),
//         });

//         res.status(200).json({ message: 'Content extracted and saved successfully.' });
//     } catch (error) {
//         console.error('Error scraping and extracting content:', error);
//         res.status(500).json({ message: 'Error scraping and extracting content.' });
//     }
// }
