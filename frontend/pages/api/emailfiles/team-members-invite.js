import { Html } from "@react-email/html";
import { Body } from "@react-email/body";

export default function TeamEmail({ managerName, email, token, teamManager, createdUsers, brandName }) {
    console.log('members invitejs: ', `brandName:`, brandName, 'email', email, 'teamManager', teamManager, 'CU', createdUsers);
    return (
        <Html>
            <Body>
                <p>Hello,</p>
                <p>
                    Hope this email finds you well. {teamManager !== undefined && teamManager !== null ? teamManager : managerName} is sending you an invite to join{' '}
                    {brandName !== null ? `${brandName}'s team` : "their brand's team"} on ForgedMart.
                </p>
                {/* <p><a href={`http://localhost:3000/api/verify/${token}`}>Please verify your account(Local)</a></p> */}
                <p><a href={`https://forgedmart.com/api/verify/${token}`}>Please join us to accept the invite.</a></p>

                <p>Sincerely,</p>
                <p>ForgedMart Team</p>
            </Body>
        </Html>
    );
}
