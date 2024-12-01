import React from "react";
import ChatBody from "./ChatBody";
import { FaCircleNotch } from "react-icons/fa6";

const ChatWrapper = ({
  prompt,
  updatePrompt,
  onSend,
  chatHistory,
  isLoading,
  onKeyDown
}) => {
  
  return (
    <div className="max-w-screen-lg border mx-auto p-2 flex flex-col h-[80dvh] no-scrollbar flex flex-col">
      <div className="header text-center">Jayden AI</div>

      <ChatBody chatHistory={chatHistory} />

      <div className="footer flex item-center gap-2">
        <input
          onChange={(e) => updatePrompt(e.target.value)}
          disabled={isLoading}
          type="text"
          value={prompt}
          placeholder="Type Message"
          onKeyDown={onKeyDown}
          className="flex-1 border outline-none rounded-[100px] px-4"
        />
        <button
          type="button"
          disabled={isLoading}
          className="py-3  px-6 bg-blue-500 text-white font-bold rounded-[100px] hover:bg-sky-700 duration-[0.5s] disabled:bg-gray-100"
          onClick={onSend}
        >
          {isLoading ? (
            <FaCircleNotch className="animate-spin h-5 w-5 text--500 " />
          ) : (
            "Send"
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatWrapper;
