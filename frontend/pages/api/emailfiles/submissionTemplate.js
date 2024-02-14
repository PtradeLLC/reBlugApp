import React from "react";
import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components";

const SubmissionTemplate = ({ firstName, description, fullName, website }) => (
    <Html>
        <Head />
        <Preview>
            You have a new Sponsor for your blog
        </Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src={`https://forgedmart.com/images/OtherVar.png`}
                    width="70"
                    height="50"
                    alt="Koala"
                    style={logo}
                />
                <Text style={paragraph}>Hi {firstName},</Text>
                <Text style={paragraph}>
                    You have a new sponsorship inquiry from {fullName} waiting for your response.
                    Below is a description of the product they want you to review for potential inclusion
                    in your next article, and you can find further information about the product on their website: {website}.
                    <br />
                    <Hr style={hr} />
                    <Text style={review}>{description}</Text>
                    <Hr style={hr} />
                    <br />
                    Please click on the button below to login to your ForgedMart account to proceed.
                </Text>
                <Section style={btnContainer}>
                    <Button style={button} href="https://forgedmart.com/login">
                        Login
                    </Button>
                </Section>
                <Text style={paragraph}>
                    Best,
                    <br />
                    The ForgedMart team
                </Text>
                <Hr style={hr} />
            </Container>
        </Body>
    </Html>
);



export default SubmissionTemplate;

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

const logo = {
    margin: "0 auto",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};

const btnContainer = {
    textAlign: "center",
};

const button = {
    backgroundColor: "#5F51E8",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    padding: "12px",
};

const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};

const review = {
    ...paragraph,
    padding: "24px",
    backgroundColor: "#f2f3f3",
    borderRadius: "4px",
};
