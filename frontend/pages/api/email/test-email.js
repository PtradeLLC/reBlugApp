export default async function handler(req, res) {
  const data = req.body;

  const baseUrl = "https://api.brevo.com/v3/contacts";

  if (req.method === "GET") {
    res.status(200).json({ message: "Success" });
  }

  if (req.method === "POST") {
    try {
      // send data to Brevo
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": `${process.env.NEXT_PUBLIC_BREVO_FORGEDMART_API_KEY}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (res.status === 200) {
        // Pass the handler function from email template in here
        // This is going to create an email and send it to user
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: `There is an error: ${error}` });
    }
  } else {
    console.log("error");
  }
}
