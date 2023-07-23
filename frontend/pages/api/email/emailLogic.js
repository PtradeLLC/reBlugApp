import { sendEmail } from "./prospectTemplate";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ message: "Success!" });
  }

  if (req.method === "POST") {
    const { email, firstName, lastName } = req.body;

    try {
      const trialAccount = await prisma.TrialProspect.create({
        data: {
          email,
          firstName,
          lastName,
        },
      });
      await sendEmail();
      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Error sending email ${error}` });
    }
  }
}
