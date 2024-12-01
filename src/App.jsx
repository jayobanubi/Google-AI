import { useEffect, useState } from "react";
import ChatWrapper from "./components/ChatWrapper";
import axios from "axios";
import { VscClearAll } from "react-icons/vsc";

const baseUrl =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCy9dxQUikmbXgRDYaY-7Qc0k_U5hu37G4";

function App() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState(() => {
    const storedHistory = localStorage.getItem("@chatHistory");
    return storedHistory ? JSON.parse(storedHistory) : [];
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("@chatHistory")) {
      setChatHistory(JSON.parse(localStorage.getItem("@chatHistory")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("@chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (event.shiftKey) {
        return;
      } else {
        event.preventDefault();
        onSend();
      }
    }
  };

  const onClearChat = () => {
    localStorage.removeItem("@chatHistory");
    window.location.reload();
  };

  const onSend = async () => {
    let newMessage = {
      text: message,
      role: "user",
    };
    setChatHistory((prevHistory) => [...prevHistory, newMessage]);

    setMessage("");
    setIsLoading(true);

    try {
      const contents = [
        ...chatHistory.map((item) => ({
          role: item.role,
          parts: [{ text: item.text }],
        })),
        {
          role: "user",
          parts: [{ text: message }],
        }, // Add current chat message
      ];

      const response = await axios.post(baseUrl, {
        contents,
      });
      newMessage = {
        text: response.data.candidates[0].content.parts[0].text,
        role: response.data.candidates[0].content.role,
      };
      setChatHistory((prevHistory) => [...prevHistory, newMessage]);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex items-center justify-end my-4">
        <button
          type="button"
          onClick={onClearChat}
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <VscClearAll aria-hidden="true" className="-ml-0.5 size-5" />
          clear chat
        </button>
      </div>
      <ChatWrapper
        prompt={message}
        updatePrompt={setMessage}
        onSend={onSend}
        chatHistory={chatHistory}
        isLoading={isLoading}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default App;
