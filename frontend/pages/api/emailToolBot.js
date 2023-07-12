import { PrismaClient } from "@prisma/client";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end("Method Not Allowed");
    return;
  }
  // Check if the request's Content-Type header is application/json
  if (
    !req.headers ||
    !req.headers["content-type"].startsWith("application/json")
  ) {
    res.status(400).end("Request body must be JSON");
    return;
  }

  if (req.method === "POST") {
    try {
      const {
        email,
        subjectLine,
        emailBody,
        productImage,
        productDescritption,
        Embed,
        productUrl,
      } = await req.body;

      const sentMessage = await prisma.EmailTool.create({
        data: {
          email,
          subjectLine,
          emailBody,
          productImage,
          productDescritption,
          productUrl,
          User: { connect: { Email: email } },
          document: { connect: { embedding: Embed } },
        },
      });

      console.log(sentMessage);
      res.json(sentMessage);
    } catch (error) {
      res.status(500).end(error.message || error.toString());
    }
  } else {
    console.log("Request not valid");
  }
}
