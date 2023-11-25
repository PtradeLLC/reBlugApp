import { Html } from "@react-email/html";
import { Body } from "@react-email/body";

export default function Email({ firstName, token }) {
  console.log("firstName FROM new-userHTML:", firstName, "token:", token);
  return (
    <Html>
      <Body>
        <p>Hello {firstName},</p>
        <p>Hope this email finds you well.</p>
        <p>Thanks for signing up. Please verify your account by clicking this link:</p>
        <p><a href={`http://localhost:3000/api/verify/${token}`}>Verify your account</a></p>
      </Body>
    </Html>
  );
}
