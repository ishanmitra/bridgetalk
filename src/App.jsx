import { useState } from "react";
import RoleSelector from "./components/RoleSelector.jsx";
import ChatWindow from "./components/ChatWindow.jsx";

function App() {
  const [role, setRole] = useState(null); // 'A' or 'B'
  const [messages, setMessages] = useState([]);
  const [interimMessage, setInterimMessage] = useState("");
  const [roomId] = useState("room123"); // or generate dynamically

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-emerald-200 via-emerald-100 to-emerald-600">
      <h1 className="text-3xl text-center md:text-4xl font-bold bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent w-full mb-8 pb-5">BridgeTalk</h1>
      {!role ? (
        <RoleSelector onSelect={setRole} />
      ) : (
        <>
          <ChatWindow
            role={role}
            setRole={setRole}
            messages={messages}
            setMessages={setMessages}
            interimMessage={interimMessage}
            setInterimMessage={setInterimMessage}
            roomId={roomId} />
        </>
      )}
    </div>
  );
}

export default App;
