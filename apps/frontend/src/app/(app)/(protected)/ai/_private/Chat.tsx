"use client";

import { FC } from "react";

import { useChat } from "ai/react";

const Chat: FC = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/ai/chat",
  });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id}>
            <div>
              <div className="font-bold">{m.role}</div>
              <p>{JSON.stringify(m)}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <button type="submit">Prompt</button>
      </form>
    </div>
  );
};

export default Chat;
