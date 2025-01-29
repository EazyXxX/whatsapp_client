import React, { useState } from "react";
import { useChatStore } from "../store/chatStore";

export const NewChatForm: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const setCurrentChat = useChatStore((state) => state.setCurrentChat);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    setCurrentChat(phoneNumber.replace(/^(?:\+8|8)/, "7"));
    setPhoneNumber("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-b">
      <div className="flex gap-2">
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number (e.g.: 79001234567)"
          className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Start Chat
        </button>
      </div>
    </form>
  );
};
