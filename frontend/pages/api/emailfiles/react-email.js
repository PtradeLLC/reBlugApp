import * as React from "react";
import { useState, useEffect } from "react";
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
import { Tailwind } from "@react-email/tailwind";

export function Email(props) {
  const { email, firstName, lastName, brand_url, logo, email_body, data } =
    props; // Destructure the necessary props here
  const [chatbot, setChatbot] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Initialize chat history with messages from the 'data' array (chatbot logic)
    setChatHistory(
      data.map((item) => ({ sender: "chatbot", message: item.message }))
    );
  }, [data]);

  const handleChange = (e) => {
    setChatbot(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (chatbot.trim() === "") {
      return; // Don't send empty messages
    }

    // Update the chat history with the user's message
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { sender: "user", message: chatbot },
    ]);

    // Simulate the chatbot response (replace this with actual chatbot logic)
    const chatbotResponse = "This is a sample chatbot response.";
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { sender: "chatbot", message: chatbotResponse },
    ]);

    // Clear the input field after sending the message
    setChatbot("");
  };

  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#007291",
            },
          },
        },
      }}
    >
      <Html lang="en">
        <Body className="bg-white">
          <Container className="bg-white px-2.5">
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
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Row style={{ justifyContent: "space-between" }}>
                <Column style={{ width: "50%" }}>
                  Hello {firstName},<br />
                  {email_body}
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
                  <div>
                    {/* Display the chat history */}
                    {chatHistory.map((chat, index) => (
                      <p
                        key={index}
                        style={{
                          color: chat.sender === "chatbot" ? "blue" : "black",
                        }}
                      >
                        {chat.message}
                      </p>
                    ))}
                    <form onSubmit={handleSubmit}>
                      <label>Enter your message</label>
                      <input
                        id=""
                        type="text"
                        onChange={handleChange}
                        value={chatbot}
                      />
                      <Button type="submit">Send message</Button>
                    </form>
                  </div>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
