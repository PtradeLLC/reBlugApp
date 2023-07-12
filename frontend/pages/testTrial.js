import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="mt-40 flex justify-center text-center">
      {messages.length > 0
        ? messages.map((m) => (
            <div key={m.id}>
              {m.role === "user" ? "User: " : "AI: "}
              {m.content}
            </div>
          ))
        : null}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
