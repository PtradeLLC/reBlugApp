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
          {/* ... (other email content) */}
          <table>
            <tr>
              <td>
                {/* Display the chat history */}
                {data.map((item, index) => (
                  <p
                    key={index}
                    style={{
                      color: item.sender === "chatbot" ? "blue" : "black",
                    }}
                  >
                    {item.message}
                  </p>
                ))}
              </td>
            </tr>
          </table>
        </Body>
      </Html>
    </Tailwind>
  );
}
