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

  const chatHistory = data.map((item) => ({
    sender: "chatbot",
    message: item.message,
  }));

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
      <Html>
        <Body>
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <tr>
              <td
                style={{
                  background: "#f7f7f7",
                  padding: "20px",
                }}
              >
                <img src={logo} alt="Logo" width="100" />
                <p>Hello {firstName},</p>
                <p>{email_body}</p>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  background: "#ffffff",
                  border: "2px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                  boxShadow: "10px 10px 10px 10px #000000",
                }}
              >
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
                <form>
                  <label htmlFor="chatbotInput">Enter your message</label>
                  <input
                    type="text"
                    id="chatbotInput"
                    name="chatbotInput"
                    style={{
                      width: "100%",
                      padding: "5px",
                      marginBottom: "10px",
                    }}
                  />
                  <input
                    type="submit"
                    value="Send message"
                    style={{
                      background: "#007291",
                      color: "#fff",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  />
                </form>
              </td>
            </tr>
          </table>
        </Body>
      </Html>
    </Tailwind>
  );
}
