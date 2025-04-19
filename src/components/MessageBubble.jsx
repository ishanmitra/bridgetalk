const MessageBubble = ({ role, text }) => {
    const isA = role === "A";
    const isB = role === "B";
  
    return (
      <div className={`flex ${isB ? "justify-end" : "justify-start"}`}>
        <div
          className={`max-w-xs px-4 py-2 rounded-xl shadow ${
            isA ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
          }`}
        >
          <strong>{role}:</strong> {text}
        </div>
      </div>
    );
  };
  
  export default MessageBubble;
  