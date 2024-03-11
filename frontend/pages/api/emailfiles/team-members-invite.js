import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";



export const TeamEmail = ({ password, firstName, lastName, token, teamManager }) => {
    const previewText = `Join ${teamManager} on ForgedMart`;

    const baseUrl = process.env.INVITE_EMAIL_LINK
        ? `https://${process.env.INVITE_EMAIL_LINK}/${token}`
        : "";

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans px-2">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
                        <Section className="mt-[32px]">
                            <Img
                                src={`https://forgedmart.com/images/Mart.png`}
                                width="40"
                                height="37"
                                alt="ForgedMart"
                                className="my-0 mx-auto"
                            />
                        </Section>
                        <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                            Join <strong>{teamManager}</strong> on <strong>ForgedMart</strong>
                        </Heading>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Hello {firstName},
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            <strong>{teamManager}</strong> (
                            <Link
                                href={`mailto:${baseUrl}`}
                                className="text-blue-600 no-underline"
                            >
                                {baseUrl}
                            </Link>
                            ) has invited you to the <strong>{teamName}</strong> team on{" "}
                            <strong>Vercel</strong>.
                        </Text>
                        <Section>
                            <Row>
                                <Column align="right">
                                    <Img
                                        className="rounded-full"
                                        src={userImage}
                                        width="64"
                                        height="64"
                                    />
                                </Column>
                                <Column align="center">
                                    <Img
                                        src={`${baseUrl}/static/vercel-arrow.png`}
                                        width="12"
                                        height="9"
                                        alt="invited you to"
                                    />
                                </Column>
                                <Column align="left">
                                    <Img
                                        className="rounded-full"
                                        src={teamImage}
                                        width="64"
                                        height="64"
                                    />
                                </Column>
                            </Row>
                        </Section>
                        <Section className="text-center mt-[32px] mb-[32px]">
                            <Button
                                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                                href={inviteLink}
                            >
                                Join the team
                            </Button>
                        </Section>
                        <Text className="text-black text-[14px] leading-[24px]">
                            or copy and paste this URL into your browser:{" "}
                            <Link href={inviteLink} className="text-blue-600 no-underline">
                                {inviteLink}
                            </Link>
                        </Text>
                        <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                        <Text className="text-[#666666] text-[12px] leading-[24px]">
                            This invitation was intended for{" "}
                            <span className="text-black">{username}</span>. This invite was
                            sent from <span className="text-black">{inviteFromIp}</span>{" "}
                            located in{" "}
                            <span className="text-black">{inviteFromLocation}</span>. If you
                            were not expecting this invitation, you can ignore this email. If
                            you are concerned about your account's safety, please reply to
                            this email to get in touch with us.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};


export default TeamEmail;


















// import { Body } from "@react-email/body";
// import { Button } from "@react-email/button";
// import { Container } from "@react-email/container";
// import { Head } from "@react-email/head";
// import { Heading } from "@react-email/heading";
// import { Html } from "@react-email/html";
// import { Hr } from "@react-email/hr";
// import { Img } from "@react-email/img";
// import { Link } from "@react-email/link";
// import { Preview } from "@react-email/preview";
// import { Section } from '@react-email/section';
// import { Text } from '@react-email/text';



// const LinearLoginCodeEmail = ({ firstName, lastName, token, password }) => {

//     const invitedMembers = `https://forgedmart.com/api/verify/${token}`

//     return (
//         <Html>
//             <Head />
//             <Preview>{firstName} {lastName} is inviting you</Preview>
//             <Body style={main}>
//                 <Container style={container}>
//                     <Img
//                         src={`https://forgedmart.com/images/Mart.png`}
//                         width="100"
//                         height="36"
//                         alt="ForgedMart"
//                         style={logo}
//                     />
//                     <Heading style={heading}>{firstName} {lastName} is invites you to join his team on ForgedMart</Heading>
//                     <Section style={buttonContainer}>
//                         <Button pY={11} pX={23} style={button} href={invitedMembers}>
//                             Sign up to Join
//                         </Button>
//                     </Section>
//                     <Text style={paragraph}>
//                         Hope this email finds you well. {firstName} {lastName}'s marketing team is
//                         on ForgedMart, and {firstName} is sending you an invite to join. Please use the following as your temporary password, but be sure to update it once you are signed into your account:
//                     </Text>
//                     <code style={code}>{password}</code>
//                     <Text style={paragraph}>
//                         🎉 Welcome to ForgedMart✨
//                     </Text>
//                     <Hr style={hr} />
//                     <Link href="https://forgedmart.com" style={reportLink}>
//                         ForgedMart
//                     </Link>
//                 </Container>
//             </Body>
//         </Html>
//     )
// };

// export default LinearLoginCodeEmail;

// const baseUrl = process.env.NEXT_PUBLIC_ENDPOINT
//     ? `https://${process.env.NEXT_PUBLIC_ENDPOINT}`
//     : '';

// const logo = {
//     borderRadius: 21,
//     width: 42,
//     height: 42,
// };

// const main = {
//     backgroundColor: '#ffffff',
//     fontFamily:
//         '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
// };

// const container = {
//     margin: '0 auto',
//     padding: '20px 0 48px',
//     width: '560px',
// };

// const heading = {
//     fontSize: '24px',
//     letterSpacing: '-0.5px',
//     lineHeight: '1.3',
//     fontWeight: '400',
//     color: '#484848',
//     padding: '17px 0 0',
// };

// const paragraph = {
//     margin: '0 0 15px',
//     fontSize: '15px',
//     lineHeight: '1.4',
//     color: '#3c4149',
// };

// const buttonContainer = {
//     padding: '27px 0 27px',
// };

// const button = {
//     backgroundColor: '#FF7B7B',
//     borderRadius: '3px',
//     fontWeight: '600',
//     color: '#fff',
//     fontSize: '15px',
//     textDecoration: 'none',
//     textAlign: 'center',
//     display: 'block',
// };

// const reportLink = {
//     fontSize: '14px',
//     color: '#b4becc',
// };

// const hr = {
//     borderColor: '#dfe1e4',
//     margin: '42px 0 26px',
// };

// const code = {
//     fontFamily: 'monospace',
//     fontWeight: '700',
//     padding: '15px 4px',
//     backgroundColor: '#dfe1e4',
//     letterSpacing: '-0.3px',
//     fontSize: '21px',
//     borderRadius: '4px',
//     color: '#3c4149',
// };

