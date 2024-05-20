import { PrismaClient, Session } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session: Session | null = await getServerSession(req, res, {});

    if (!session) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // const email: string = session.user.email;

    console.log(session);

    if (req.method === "POST") {
      const formData: any = req.body;

      // Fetch the user from the database
      //   const user = await prisma.user.findUnique({
      //     where: {
      //       email: email,
      //     },
      //   });

      //   if (!user) {
      //     res.status(404).json({ message: "User not found" });
      //     return;
      //   }

      // User exists, create an instance of ProductLaunchData and save the formData
      const savedData = await prisma.productLaunchData.create({
        data: {
          title: formData.title,
          feature01: formData.feature01,
          feature02: formData.feature02,
          feature03: formData.feature03,
          demographic: formData.demographic,
          company: formData.company,
          geographic: formData.geographic,
          job_title: formData.job_title,
          about: formData.about,
          objectives: formData.objectives,
          client_type: formData.client_type,
          pain_point01: formData.pain_point01,
          pain_point02: formData.pain_point02,
          pain_point03: formData.pain_point03,
          pain_point04: formData.pain_point04,
          unique01: formData.unique01,
          unique02: formData.unique02,
          unique03: formData.unique03,
          unique04: formData.unique04,
          tool01: formData.tool01,
          tool02: formData.tool02,
          tool03: formData.tool03,
          tool04: formData.tool04,
          website: formData.website,
        },
      });

      // LLM API CALL

      const MODEL_NAME: string = "gemini-1.5-pro-latest";
      const API_KEY: string | undefined = process.env.GEMINI_API_KEY;

      if (!API_KEY) {
        res.status(500).json({ message: "API Key not provided" });
        return;
      }

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const generationConfig = {
        temperature: 1,
        topK: 0,
        topP: 0.95,
        maxOutputTokens: 8192,
      };

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];

      const prompt = [
        `Your task is to analyze  '${savedData.about}', and write a short summary in a paragraph about it. Provide an informative description about how 'email marketing' can help its promotional efforts.

        Based on your "${savedData.about}" analysis above, do the following:
        * Write a short summary 'About Product' in a paragraph about '${savedData.about}' to show how much you know about the product .
        * Create a bulleted LIST of 'Ideal Customers' for the product as well as 'decision makers'. Highlight the individuals 'based on job titles' that are most likely to approve this product for purchase.
        * Leverage web data as a research tool to identify 'pain points' that the product solves for 'Ideal Customers' and compare it in contrast with '${savedData.pain_point01}', ' ${savedData.pain_point02}', '${savedData.pain_point03}', '${savedData.pain_point04}'.
        * Identify and provide a list of key characteristics of the 'Ideal Customers', and suggest how to engage and interest them in the product.
        Suggest ways to market and promote the product to 'Ideal Customers'.
        Base your strategies and suggestions for either 'B2B', B2C' or 'Both' - Identify which 'Customer Type' - 'B2B', B2C' or 'both' is most likely to purchase the product.
        Create a LIST of 'decision makers', individuals based on 'job titles' that are most likely to approve this product for purchase"
        When you provide your final answer, please 'EXPLAIN' the 'reasoning and assumptions' behind your suggested 'Ideal Customers', and why they are ideal for the product.
        `,
      ];

      try {
        const chat = model.startChat({
          generationConfig,
          safetySettings,
          history: [],
        });

        const result = await chat.sendMessage(prompt);
        const response = result.response;
        const text = response.text;
        res.status(200).json({ message: text });
      } catch (error) {
        // If JSON parsing fails, log the error and send a generic error response
        console.error("Error processing AI response:", error);
        res.status(500).json({ message: "Error processing AI response" });
      }
    } else {
      // Handle other HTTP methods if needed
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle errors
    console.error("Error processing request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
