import * as React from "react";
import { Html } from "@react-email/html";
import { Button } from "@react-email/button";
import { Container } from "@react-email/container";
import { Body } from "@react-email/body";
import { Section } from "@react-email/section";
import { Row } from "@react-email/row";
import { Column } from "@react-email/column";
import { Head } from "@react-email/head";
import { Heading } from "@react-email/heading";
import { Text } from "@react-email/text";
import { Hr } from "@react-email/hr";
import Chat from "../../forgedMartchatbot/components/Chat";
import OpenAIStream from "../../forgedMartchatbot/utils/OpenAIStream";

export function Email(props) {
  const { url } = props;

  return (
    <Html lang="en">
      <Head>
        <title>My email title</title>
      </Head>
      <Body style={{ backgroundColor: "#fff" }}>
        <Container>
          <Section>
            <Row>
              <Column style={{ width: "100%" }}>
                <Heading as="h1">Heading goes here</Heading>
              </Column>
            </Row>
          </Section>
          <Section>
            <Row>
              <Column style={{ width: "50%" }}>
                Lets try this
                <Text>Lorem ipsum</Text>
              </Column>
              <Column style={{ width: "50%" }}>
                <Hr />
                <img
                  src="https://forgedmart.com/api/webhooks/user/chatbot-opened"
                  alt="Chatbot Opened"
                  width="1"
                  height="1"
                />
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
