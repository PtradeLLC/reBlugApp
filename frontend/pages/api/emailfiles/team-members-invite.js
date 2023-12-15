import { Html } from "@react-email/html";
import { Body } from "@react-email/body";

export default function TeamEmail({ managerName, email, token, teamManager, createdUsers, brandName }) {
    console.log('members invitejs Created Users: ', createdUsers, teamManager, managerName, brandName);
    return (
        <Html>
            <Body>
                <p>Hello,</p>
                <p>
                    Hope this email finds you well. {brandName ? `${brandName}'s team` : `${teamManager != null ? teamManager : managerName}'s team is`}{' '}
                    on ForgedMart. {teamManager != null ? teamManager : managerName} is sending you an invite to join.
                </p>
                {/* <p><a href={`http://localhost:3000/api/verify/${token}`}>Please verify your account(Local)</a></p> */}
                <p><a href={`https://forgedmart.com/api/verify/${token}`}>Please join us to accept the invite.</a> 🎉 Welcome to ForgedMart✨</p>


                <p>Sincerely,</p>
                <p>ForgedMart Team</p>
            </Body>
        </Html>
    );
}
