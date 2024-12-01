import Markdown from "markdown-to-jsx";
import React, { useEffect, useRef } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Code = ({ className, children }) => {
  const language = className?.replace("lang-", "");
  return (
    <div className="codeBlock">
      <SyntaxHighlighter
        language={language?.toLowerCase()}
        style={materialDark}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

const ChatBody = ({ chatHistory }) => {
  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory.length]);
  return (
    <div
      ref={chatContainerRef}
      className="overflow-scroll h-full no-scrollbar flex-1"
    >
      {chatHistory.length > 0 ? (
        chatHistory.map((chat, i) => (
          <div
            key={i}
            className={`border my-1 rounded-2xl ${
              chat.role === "user"
                ? "rounded-br-[4px] ml-auto "
                : "rounded-bl-[4px]"
            } p-3 text-sm w-fit max-w-[65%] `}
          >
            {chat.role === "user" ? (
              chat.text
            ) : (
              <Markdown
                options={{
                  overrides: {
                    code: {
                      component: Code,
                    },
                  },
                }}
              >
                {chat.text}
              </Markdown>
            )}
          </div>
        ))
      ) : (
        <div>I have been waiting for a message</div>
      )}
    </div>
  );
};

export default ChatBody;
