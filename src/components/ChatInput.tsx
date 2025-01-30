import React, { useState } from "react";
import { Send } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/chatStore";
import { sendMessage } from "../api/greenApi";

export const ChatInput: React.FC = () => {
  const [message, setMessage] = useState("");
  const { idInstance, apiTokenInstance } = useAuthStore();
  const { currentChat, addMessage } = useChatStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !currentChat) return;

    try {
      const sentMessage = await sendMessage(
        idInstance,
        apiTokenInstance,
        currentChat.phoneNumber,
        message
      );
      addMessage({
        id: sentMessage.idMessage || Date.now().toString(),
        text: message,
        timestamp: Date.now(),
        isOutgoing: true,
        isRead: false,
      });

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-white p-4 border-t"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
      />
      <button
        type="submit"
        className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
      >
        <Send size={30} />
      </button>
    </form>
  );
};
