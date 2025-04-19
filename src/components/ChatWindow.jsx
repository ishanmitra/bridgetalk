import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble.jsx";
import socket from "../lib/socket.js";
import SpeakerA from "./roles/SpeakerA.jsx";
import SpeakerB from "./roles/SpeakerB.jsx";
import LLM from "./roles/LLM.jsx"; // Adjust path as needed

const ChatWindow = ({
  role,
  setRole,
  messages,
  setMessages,
  roomId,
  interimMessage,
  setInterimMessage,
  interimMessageDisplay, // Add this new prop for interim message display
  setInterimMessageDisplay, // Add this new prop for updating interim message
}) => {
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Socket: join room and receive messages
  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("chat-message", ({ message }) => {
      // If the message is interim, set it for display
      if (message.interim) {
        setInterimMessage(message.text); // Set interim message
      } else {
        setMessages((prev) => [...prev, message]); // Add final message to the list
        setInterimMessage(null); // Clear interim message once final message arrives
      }
    });

    return () => {
      socket.off("chat-message");
    };
  }, [roomId, setMessages, setInterimMessage]);

  const sendInterimMessage = (message) => {
    // Emit interim message with 'interim' flag set
    socket.emit("chat-message", { roomId, message: { ...message, interim: true } });
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg = { role, text: input };
    
    // Emit final message
    socket.emit("chat-message", { roomId, message: newMsg });

    // Optionally emit interim message if needed
    if (interimMessage) {
      sendInterimMessage({ role, text: interimMessage });
    }

    setInput(""); // Clear input field
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, interimMessage]);

  return (
    <div className="mx-auto bg-white rounded-2xl shadow p-4">
      <button
        onClick={() => setRole(null)}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Back to Home
      </button>


      <div id="chat-history" className="h-96 overflow-y-auto space-y-2 border p-2 mb-4 rounded-lg">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} role={msg.role} text={msg.text} />
        ))}

        {/* Display interim message if available */}
        {interimMessageDisplay && ( // Use the new prop for interim message
          <MessageBubble
            role={role} // Display the interim message based on the current role
            text={interimMessageDisplay}
            isInterim={true} // For styling as an interim message
          />
        )}

        <div ref={chatEndRef} />
      </div>

      {role === "B" && (
        <>
          <SpeakerB roomId={roomId} />
          <div className="flex gap-2">
            <input
              className="flex-1 border rounded-lg p-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your prompt..."
            />
            <button onClick={sendMessage} className="text-white inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600">
              Send
            </button>
          </div>
          <LLM roomId={roomId} />
        </>
      )}

      {role === "A" && (
        <>
          <SpeakerA roomId={roomId} setInterimMessage={setInterimMessage} setInterimMessageDisplay={setInterimMessageDisplay} />
          <div className="text-center mt-2 text-sm text-gray-500">
            Listening...
          </div>
        </>
      )}

    </div>
  );
};

export default ChatWindow;
