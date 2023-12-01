import { Html } from "@react-email/html";
import { Body } from "@react-email/body";

export default function TeamEmail({ email, token, teamManager, createdUsers, brandName }) {
    return (
        <Html>
            <Body>
                <p>Hello,</p>
                <p>Hope this email finds you well. {teamManager} is sending you an invite to join his team with {brandName} on ForgedMart. Please verify your email by clicking this link:</p>
                {/* <p><a href={`http://localhost:3000/api/verify/${token}`}>Please verify your account(Local)</a></p> */}
                <p><a href={`https://forgedmart.com/api/verify/${token}`}>Please verify your account</a></p>

                <p>Sincerely,</p>
                <p>ForgedMart Team</p>
            </Body>
        </Html>
    );
}
