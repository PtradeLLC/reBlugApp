import { Resend } from 'resend';
import sgMail from "@sendgrid/mail";
import { render } from "@react-email/render";
import TeamEmail from "../emailfiles/team-members-invite";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function POST({ email, token, manager, firstName, lastName, password }) {

    const teamManager = `${firstName} ${lastName}`;
    const brandName = `${manager.brandName}`;

    <TeamEmail email={email} teamManager={teamManager} password={password} firstName={firstName} lastName={lastName} token={token} />

    try {
        const { data, error } = await resend.emails.send({
            from: 'support@forgedmart.com',
            to: {email},
            subject: `${teamManager !== null ? teamManager : managerName} invites you to join his team`,
            react: TeamEmail({ email, token, manager, firstName, lastName, password }),
        });
    
        if (error) {
            return Response.json({ error });
        }
    
        return Response.json(data);
        
    } catch (error) {
        console.error("Error sending email:", error);
        if (error.response) {
            console.error("API response:", error.response.body);
        }
    }   
}

// export default async function SendMemberInvite({ email, token, manager, firstName, lastName, password }) {
//     // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//     const teamManager = `${firstName} ${lastName}`;
//     const brandName = `${manager.brandName}`;

//     // Render the Email component with ChatComponent prop set to the Chat component
//     const emailHtml = render(
//         <TeamEmail password={password} firstName={firstName} lastName={lastName} token={token} />
//     );


    

//     const msg = {
//         to: email, // Change to your recipient
//         from: "support@forgedmart.com", // Change to your verified sender
//         subject: `${teamManager !== null ? teamManager : managerName} invites you to join his team`,
//         html: emailHtml,
//     };

//     try {
//         if (msg) {
//             await sgMail.send(msg);
//         }
//     } catch (error) {
//         console.error("Error sending email:", error);
//         if (error.response) {
//             console.error("API response:", error.response.body);
//         }
//     }
// }


