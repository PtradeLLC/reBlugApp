export const config = {
    api: {
        bodyParser: {
            sizeLimit: '5mb', // Adjust size limit as needed
        },
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Handle your POST request here
        // Example: handle incoming data and respond
        const data = req.body;
        // Process data
        res.status(200).json({ success: true, data });
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
