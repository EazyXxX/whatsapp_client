import React from "react";
import { useChatStore } from "../store/chatStore";

export const MessageList: React.FC = () => {
  const { currentChat } = useChatStore();

  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Start a new chat to begin messaging</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#efeae2]">
      {currentChat.messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.isOutgoing ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[70%] p-3 rounded-lg ${
              message.isOutgoing
                ? "bg-[#d9fdd3] text-black"
                : "bg-white text-black"
            }`}
          >
            <p className="break-words">{message.text}</p>
            <p className="text-xs text-gray-500 text-right mt-1">
              {new Date(message.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
