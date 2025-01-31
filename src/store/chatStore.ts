import { create } from "zustand";
import { Chat, Message, StatusField } from "../types";

interface ChatStore {
  currentChat: Chat | null;
  setCurrentChat: (phoneNumber: string) => void;
  addMessage: (message: Message) => void;
  setMessageStatus: (messageId: string, statusField: StatusField) => void;
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
  setMessageStatus: (messageId: string, statusField: StatusField) => {
    set((state) => ({
      currentChat: state.currentChat
        ? {
            ...state.currentChat,
            messages: state.currentChat.messages.map((message) =>
              // Blocking received messages status setting
              message.id === messageId && message.isOutgoing
                ? { ...message, [statusField]: true }
                : message
            ),
          }
        : null,
    }));
  },
}));
