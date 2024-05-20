import prisma from "../../lib/db";

export default async function handler(req, res) {
    try {
        // Check if the request method is POST
        if (req.method !== 'POST') {
            return res.status(405).json({ message: 'Method not allowed' });
        }

        // Extract form data from request body
        const formData = req.body.split('\n');

        const extractedValues = {
            firstName: '',
            lastName: '',
            brandName: '',
            email: '',
        };

        for (let i = 0; i < formData.length; i++) {
            const line = formData[i];

            if (line.startsWith('Content-Disposition: form-data; name=')) {
                const fieldName = line.split('name="')[1].split('"')[0];

                const valueIndex = i + 2; // Next line after field name line
                extractedValues[fieldName] = formData[valueIndex].trim(); // Extract and trim value
            }
        }

        // Update user in the database
        const user = await prisma.user.update({
            where: {
                email: extractedValues.email,
            },
            data: {
                firstName: extractedValues.firstName,
                lastName: extractedValues.lastName,
                brandName: extractedValues.brandName,
                name: extractedValues.firstName + " " + extractedValues.lastName,
            },
        });

        return res.status(200).json({ message: 'User updated successfully', user });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'There is an error' });
    }
}