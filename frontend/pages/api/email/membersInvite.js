import sgMail from "@sendgrid/mail";
import { render } from "@react-email/render";
import TeamEmail from "../emailfiles/team-members-invite";

export default async function SendMemberInvite({ email, token, manager, createdUsers, managerName }) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const teamManager = `${manager.firstName} ${manager.lastName} || ${managerName}`;
    const brandName = `${manager.brandName}`;

    // Render the Email component with ChatComponent prop set to the Chat component
    const emailHtml = render(
        <TeamEmail managerName={managerName} email={email} token={token} teamManager={teamManager} createdUsers={createdUsers} brandName={brandName} />
    );

    const msg = {
        to: email, // Change to your recipient
        from: "support@forgedmart.com", // Change to your verified sender
        subject: `${teamManager !== null ? teamManager : managerName} invites you to join his team`,
        html: emailHtml,
    };

    try {
        if (msg) {
            await sgMail.send(msg);
        }
    } catch (error) {
        console.error("Error sending email:", error);
        if (error.response) {
            console.error("API response:", error.response.body);
        }
    }
}


