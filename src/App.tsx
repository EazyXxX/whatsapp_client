import { useEffect } from "react";
import { LoginForm } from "./components/LoginForm";
import { NewChatForm } from "./components/NewChatForm";
import { MessageList } from "./components/MessageList";
import { ChatInput } from "./components/ChatInput";
import { useAuthStore } from "./store/authStore";
import { useChatStore } from "./store/chatStore";
import { receiveNotification, deleteNotification } from "./api/greenApi";

function App() {
  const { isAuthenticated, idInstance, apiTokenInstance } = useAuthStore();
  const { currentChat, addMessage } = useChatStore();

  useEffect(() => {
    if (!isAuthenticated) return;

    let isChecking = false;
    const checkNotifications = async () => {
      if (isChecking) return;

      try {
        isChecking = true;
        const notification = await receiveNotification(
          idInstance,
          apiTokenInstance
        );

        if (notification && notification.body) {
          const { receiptId, body } = notification;
          if (
            body.typeWebhook === "outgoingMessageReceived" &&
            body.messageData?.typeMessage === "textMessage" &&
            body.messageData?.textMessageData?.textMessage
          ) {
            const senderNumber = body.senderData?.sender?.split("@")[0];
            if (currentChat && senderNumber === currentChat.phoneNumber) {
              addMessage({
                id: body.idMessage || Date.now().toString(),
                text: body.messageData.textMessageData.textMessage,
                timestamp: Date.now(),
                isOutgoing: false,
              });
            }
          }

          // Delete notification after its receival
          await deleteNotification(idInstance, apiTokenInstance, receiptId);
        }
      } catch (err) {
        console.error("Error checking notifications:", err);
      } finally {
        isChecking = false;
      }
    };

    const interval = setInterval(checkNotifications, 5000);
    return () => clearInterval(interval);
  }, [isAuthenticated, currentChat, idInstance, apiTokenInstance, addMessage]);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <NewChatForm />
      <MessageList />
      {currentChat && <ChatInput />}
    </div>
  );
}

export default App;
