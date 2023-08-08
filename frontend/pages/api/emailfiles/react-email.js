import * as React from "react";
import { Html } from "@react-email/html";
import { Body } from "@react-email/body";
import { Tailwind } from "@react-email/tailwind";

export default function Email(props) {
  const { firstName, data } = props;

  const chatHistory = data?.map((item, index) => (
    <p
      key={index}
      style={{
        color: item.sender === "chatbot" ? "blue" : "black",
      }}
    >
      {item.message}
    </p>
  ));

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
          <p>Hello {firstName},</p>
          <p>Hope this email finds you well.</p>
          <p>
            Please reply to this email to ask any questions you may have about our products and services.
          </p>
          <div>
            {chatHistory}
          </div>
        </Body>
      </Html>
    </Tailwind>
  );
}
