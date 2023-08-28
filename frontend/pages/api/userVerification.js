export default async function handler(req, res) {
    const baseUrl = `${process.env.NEXT_PUBLIC_ENDPOINT}/users`;
    const appWrite_Key = process.env.NEXT_PUBLIC_CLIENT_APPWRITE_API_KEY;

    console.log(appWrite_Key);

    if (req.method === "GET") {
        try {
            // Get user verification
            const userId = req.query.userId;
            const response = await fetch(`${baseUrl}/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${appWrite_Key}`
                }
            });
            const data = await response.json();
            console.log(data);
            res.status(200).json({ success: true, message: "Verification retrieved successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message || 'Internal server error' });
        }
    }

    if (req.method === "PATCH") {
        try {
            const { emailVerification, userId } = req.body;

            if (!userId) {
                res.status(400).json({ success: false, message: "userId is required" });
                return;
            }

            const userEndpoint = `${baseUrl}/${userId}/verification`;
            const response = await fetch(userEndpoint, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${appWrite_Key}`
                },
                body: JSON.stringify({ emailVerification: emailVerification, userId: userId })
            });

            console.log("Response:", response);

            const data = await response.json();
            console.log("data: ", data);

            if (response.ok) {
                console.log("data is okay");
                res.status(200).json({ success: true, message: "Verification created successfully" });
            } else {
                console.log("Nahhh");
                res.status(400).json({ success: false, message: "Failed to create verification" });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message || 'Internal server error' });
        }
    }
}
