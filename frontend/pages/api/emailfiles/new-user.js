import { Html } from "@react-email/html";
import { Body } from "@react-email/body";

export default function Email({ firstName, token }) {
  const verificationLink = `/verify/${token}`;

  return (
    <Html>
      <Body>
        <p>Hello {firstName},</p>
        <p>Hope this email finds you well.</p>
        <p>Thanks for signing up. Please verify your account by clicking this link:</p>
        <p><a href={verificationLink}>Please verify your account</a></p>
        {/* <p><a href={`https://www.reblug.com/api/verify/${token}`}>Please verify your account</a></p> */}

        <p>Sincerely,</p>
        <p>reBlug Team</p>
      </Body>
    </Html>
  );
}
