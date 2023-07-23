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
import { Chat } from "../../../components/Chat";

export function Email(props) {
  const { url } = props;

  return (
    <Html lang="en">
      <Head>
        <title>My eml title</title>
      </Head>
      <Body style={{ backgroundColor: "#fff" }}>
        <Container>
          <Section>
            <Row>
              <Column style={{ width: "100%" }}>
                <Heading as="h1">Heading go here</Heading>
              </Column>
            </Row>
          </Section>
          <Section>
            <Row>
              <Column style={{ width: "50%" }}>
                Hello Name,
                <br />
                Hope this email find you well. Please use the chatbot to ask any
                question you have about our brand, product, anything you'd like
                to know about us. If I cannot provide an answer I can pass you
                over to my human counterpart who can answer your questions.
                Thanks for your interest. <br />
                Sincerely,
                <br />
                Chris Bitoye. <br />
                Founder,CEO <br />
                ForgedMart <br />A subsidiary of PublicTrades,LLC
              </Column>
              <Column style={{ width: "50%" }}>
                <Chat />
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
