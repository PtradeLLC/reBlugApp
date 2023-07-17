import fetch from "node-fetch";

const handler = async (req, res) => {
  const data = req.body;

  const baseUrl = "https://api.brevo.com/v3/contacts";

  if (req.method === "GET") {
    res.status(200).json({ message: "Success" });
  }

  if (req.method === "POST") {
    try {
      // Send data to Brevo to create user contact on signUp
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": `${process.env.NEXT_PUBLIC_BREVO_FORGEDMART_API_KEY}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.status === 200) {
        // Sends email to user
        await fetch("./email-template", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            handler: "handler",
            data: result,
            widget: "<Widget />", // Include the widget component as a string
          }),
        });
      }
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: `There is an error: ${error}` });
    }
  } else {
    console.log("error");
  }
};

export default handler;

// export default async function handler(req, res) {
//   const data = req.body;

//   const baseUrl = "https://api.brevo.com/v3/contacts";

//   if (req.method === "GET") {
//     res.status(200).json({ message: "Success" });
//   }

//   if (req.method === "POST") {
//     try {
//       // Send data to Brevo to Create user contact on signUp
//       const response = await fetch(baseUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Api-Key": `${process.env.NEXT_PUBLIC_BREVO_FORGEDMART_API_KEY}`,
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();
//       if (res.status === 200) {
//         // Sends email to user.
//         await fetch("./email-template", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ handler: "handler", data: result }),
//         });
//       }
//       res.status(200).json(result);
//     } catch (error) {
//       res.status(500).json({ message: `There is an error: ${error}` });
//     }
//   } else {
//     console.log("error");
//   }
// }
