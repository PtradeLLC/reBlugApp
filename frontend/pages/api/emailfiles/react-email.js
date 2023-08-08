import { Html } from "@react-email/html";
import { Body } from "@react-email/body";

export default function Email({ firstName, chatHistory }) {
  const chatItems = chatHistory?.map((item, index) => {
    const { message } = item;
    return message; // Return only the message
  });

  return (
    <Html>
      <Body> {/*This is the code at react-email.js:11.*/}
        <p>Hello</p>
        <p>Hope this email finds you well.</p>
        <p>Please reply to this email to ask any questions you may have about our products and services.</p>
        <div>
          {/* Render each chat message */}
          {chatItems.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      </Body>
    </Html>
  );
}
