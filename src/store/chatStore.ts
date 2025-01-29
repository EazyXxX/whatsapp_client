import { create } from "zustand";
import { Chat, Message } from "../types";

interface ChatStore {
  currentChat: Chat | null;
  setCurrentChat: (phoneNumber: string) => void;
  addMessage: (message: Message) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  currentChat: null,
  setCurrentChat: (phoneNumber) =>
    set({
      currentChat: {
        phoneNumber,
        messages: [],
      },
    }),
  addMessage: (message) => {
    set((state) => ({
      currentChat: state.currentChat
        ? {
            ...state.currentChat,
            messages: [...state.currentChat.messages, message],
          }
        : null,
    }));
  },
}));
