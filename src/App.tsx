import { useEffect } from "react";
import { LoginForm } from "./components/LoginForm";
import { NewChatForm } from "./components/NewChatForm";
import { MessageList } from "./components/MessageList";
import { ChatInput } from "./components/ChatInput";
import { useAuthStore } from "./store/authStore";
import { useChatStore } from "./store/chatStore";
import {
  receiveNotification,
  deleteNotification,
  checkInstanceAuthStatus,
} from "./api/greenApi";

function App() {
  const { isAuthenticated, setIsAuthenticated, idInstance, apiTokenInstance } =
    useAuthStore();
  const { currentChat, addMessage } = useChatStore();

  useEffect(() => {
    if (!isAuthenticated) return;

    const checkInstanceAndNotifications = async () => {
      try {
        const isAuthorized = await checkInstanceAuthStatus(
          idInstance,
          apiTokenInstance
        );
        if (!isAuthorized) {
          setIsAuthenticated(false);
          alert("Instance is unauthorized. Please re-authenticate");
          return;
        }

        const notification = await receiveNotification(
          idInstance,
          apiTokenInstance
        );
        if (notification && notification.body) {
          const { receiptId, body } = notification;
          //TODO add isRead case logic for sent messages
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
                //TODO add logic for received messages isRead status
                isRead: true,
              });
            }
          }

          await deleteNotification(idInstance, apiTokenInstance, receiptId);
        }
      } catch (err) {
        console.error("Error checking instance or notifications:", err);
      }
    };

    const interval = setInterval(checkInstanceAndNotifications, 5000);
    return () => clearInterval(interval);
  }, [
    isAuthenticated,
    currentChat,
    idInstance,
    apiTokenInstance,
    addMessage,
    setIsAuthenticated,
  ]);

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
