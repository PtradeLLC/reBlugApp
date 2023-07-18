import { sendEmail } from "./prospectTemplate";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ message: "Success!" });
  }

  if (req.method === "POST") {
    try {
      const filePath = path.resolve(
        process.cwd(),
        "pages/api/emailfiles/index.html"
      );
      const emailTemplate = fs.readFileSync(filePath, "utf8");
      await sendEmail(emailTemplate);
      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error sending email" });
    }
  }
}
