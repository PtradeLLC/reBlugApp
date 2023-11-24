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
        <p><a href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/verify?token=${token}`}>Verify your account</a></p>
      </Body>
    </Html>
  );
}
