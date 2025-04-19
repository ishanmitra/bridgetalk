import { useState } from "react";
import MessageBubble from "./MessageBubble.jsx";

const ChatWindow = ({ role, messages, setMessages }) => {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { role, text: input };
    setMessages([...messages, newMsg]);
    setInput("");
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-4">
      <div className="h-96 overflow-y-auto space-y-2 border p-2 mb-4 rounded-lg">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} role={msg.role} text={msg.text} />
        ))}
      </div>

      {role === "B" && (
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded-lg p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your prompt..."
          />
          <button onClick={sendMessage} className="bg-green-500 text-white px-4 rounded-lg">
            Send
          </button>
        </div>
      )}

      {role === "A" && (
        <div className="text-center mt-2 text-sm text-gray-500">
          Listening... (mic transcription coming soon)
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
