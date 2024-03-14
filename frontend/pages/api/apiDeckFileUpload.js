import { PrismaClient } from '@prisma/client'
import { Apideck } from '@apideck/node'


const apideck = new Apideck({
    apiKey: process.env.AP_DECK_API_KEY,
    appId: process.env.AP_DECK_APP_ID,
    consumerId: process.env.AP_DECK_CONSUMER_ID
});



export default async function handler(req, res) {
    // Check if it's a POST request
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    // Get the file from the request
    const file = req.files.file

    // Convert the file to a buffer
    const buffer = Buffer.from(file.data, 'binary')

    try {
        // Upload the file using Apideck
        const response = await apideck.utils.uploadFile({
            serviceId: 'dropbox',
            file: buffer,
            name: file.name,
            size: file.size,
            contentType: file.mimetype
        })

        // Send successful response
        res.status(200).json({ message: 'File uploaded successfully' })
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'File upload failed', error: error.message })
    }
}
