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
import { Img } from "@react-email/img";
import { Chat } from "../../../components/Chat";

export function Email(props) {
  const { messages, input, setInput, sendMessage, loading } = props; // Destructure the necessary props here

  return (
    <Html lang="en">
      <Body
        style={{
          width: "100%",
          backgroundColor: "#F8FAFC",
        }}
      >
        <Container
          style={{
            backgroundColor: "#fff",
            padding: "10px",
          }}
        >
          <Section>
            <Row>
              <Column style={{ width: "100%" }}>
                <Img src="banner.jpg" alt="Cat" width="600" height="300" />
                <Heading as="h1">Heading goes here</Heading>
              </Column>
            </Row>
          </Section>
          <Section
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Row style={{ justifyContent: "space-between" }}>
              <Column style={{ width: "50%" }}>
                Hello Name,
                {/* ... */}
              </Column>
              <Column
                style={{
                  width: "30%",
                  border: "2px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                  boxShadow: "10px 10px 10px 10px #000000",
                }}
              >
                {/* Pass the required props to the Chat component */}
                <Chat
                  messages={messages}
                  input={input}
                  setInput={setInput}
                  sendMessage={sendMessage}
                  loading={loading}
                />
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
