import { Html } from "@react-email/html";
import { Body } from "@react-email/body";

export default function TeamEmail({ managerName, email, token, teamManager, createdUsers, brandName }) {
    console.log('members invitejs Created Users: ', createdUsers);
    return (
        <Html>
            <Body>
                <p>Hello,</p>
                <p>
                    Hope this email finds you well. {teamManager != null ? teamManager : managerName} is sending you an invite to join{' '}
                    {brandName ? `${brandName}'s team` : "their brand's team"} on ForgedMart.
                </p>
                {/* <p><a href={`http://localhost:3000/api/verify/${token}`}>Please verify your account(Local)</a></p> */}
                <p><a href={`https://forgedmart.com/api/verify/${token}`}>Please join us to accept the invite.</a> 🎉 Welcome to ForgedMart✨</p>

                <p>Sincerely,</p>
                <p>ForgedMart Team</p>
            </Body>
        </Html>
    );
}
