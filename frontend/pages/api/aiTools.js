import React, { useState } from "react";
import { useChat } from "ai/react";

export default function PromptGenerator() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "./chat_bot",
  });

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input
            id={2}
            className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
            value={input}
            name="formInput"
            placeholder="Describe your business..."
            onChange={handleInputChange} // updating the input state
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
