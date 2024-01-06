import formidable from 'formidable';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const form = formidable();

            form.parse(req, (err, fields, files) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error handling file upload');
                    return;
                }

                // Access fields (text inputs) and files (uploaded files) separately
                const formDataObject = {
                    ...fields,
                    files: files.files, // Assuming the uploaded file field is named 'files'
                };

                console.log(formDataObject);
                res.status(200).send({ success: true }); // Send a success response
            });
            res.status(200).json({ message: 'success' });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error handling file upload');
        }
    } else {
        res.status(405).send({ error: 'Method Not Allowed' });
    }
}










// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         try {
//             const formDataObject = req.body;
//             console.log(formDataObject.firstName);
//             // console.log(formData);
//             res.status(200).send({ success: true });
//         } catch (error) {
//             console.error(error);
//             res.status(500).send('Error handling file upload');
//         }
//     } else {
//         res.status(405).send({ error: 'Method Not Allowed' });
//     }
// }
