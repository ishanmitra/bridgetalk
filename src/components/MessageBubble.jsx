import { useEffect, useState } from "react";

const MessageBubble = ({ role, text, isInterim = false }) => {
  const [visible, setVisible] = useState(false);

  const isA = role === "A";
  const isB = role === "B";
  const isAI = role === "AI";

  useEffect(() => {
    // Trigger transition after mount
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const baseStyle = `max-w-xs px-4 py-2 rounded-xl shadow transform transition-all duration-300 ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
  }`;

  const roleStyle = isA
    ? "bg-blue-100 text-blue-800"
    : isB
    ? "bg-green-100 text-green-800"
    : isAI
    ? "bg-purple-100 text-purple-800"
    : "";

  const interimStyle = "bg-gray-300 text-gray-800 italic opacity-70 animate-pulse";

  return (
    <div className={`flex ${isA ? "justify-start" : "justify-end"}`}>
      <div className={`${baseStyle} ${isInterim ? interimStyle : roleStyle}`}>
        <strong>{role}:</strong> {text}
        {isInterim && (
          <span className="inline-flex gap-1 ml-2 align-middle">
            <span
              className="w-1.5 h-1.5 bg-gray-700 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            />
            <span
              className="w-1.5 h-1.5 bg-gray-700 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            />
            <span
              className="w-1.5 h-1.5 bg-gray-700 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
