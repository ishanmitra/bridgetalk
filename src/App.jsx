import { useState } from "react";
import RoleSelector from "./components/RoleSelector.jsx";
import ChatWindow from "./components/ChatWindow.jsx";

function App() {
  const [role, setRole] = useState(null); // 'A' or 'B'
  const [messages, setMessages] = useState([]);
  const [interimMessage, setInterimMessage] = useState("");
  const [roomId] = useState("room123"); // or generate dynamically

  // useEffect(() => {
  //   // Test the Puter.js chat functionality
  //   puter.ai.chat('What is life?').then((response) => {
  //     console.log('Puter AI response:', response.message.content);
  //   });
  // }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">BridgeTalk</h1>
      {!role ? (
        <RoleSelector onSelect={setRole} />
      ) : (
        <>
          <ChatWindow
            role={role}
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
