import { useState } from "react";
import RoleSelector from "./components/RoleSelector.jsx";
import ChatWindow from "./components/ChatWindow.jsx";

function App() {
  const [role, setRole] = useState(null); // 'A' or 'B'
  const [messages, setMessages] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Hybrid Talk Interface</h1>
      {!role ? (
        <RoleSelector onSelect={setRole} />
      ) : (
        <ChatWindow role={role} messages={messages} setMessages={setMessages} />
      )}
    </div>
  );
}

export default App;
