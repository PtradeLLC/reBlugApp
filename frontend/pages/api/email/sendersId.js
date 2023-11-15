
export default async function handler(req, res) {
    const { brandName, firstName, lastName, email } = req.body;
    if (req.method === "POST") {
        try {
            console.log(brandName, firstName, lastName, email);
            // if (!response) {
            //     throw new Error(`There is no response ${response.statusText}`);
            // }
            res.status(200).json({ message: "Success" });
        } catch (error) {
            res.status(500).json({ message: error.message || 'Internal server error' });
        }
    }
}