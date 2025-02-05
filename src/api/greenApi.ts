import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const validateCredentials = async (
  idInstance: string,
  apiTokenInstance: string
) => {
  try {
    const response = await axios.get(
      `${API_URL}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
    );
    return response.data.stateInstance === "authorized";
  } catch (err) {
    console.error("Failed to authorize:", err);
    return false;
  }
};

export const sendMessage = async (
  idInstance: string,
  apiTokenInstance: string,
  phoneNumber: string,
  message: string
) => {
  try {
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, "");

    const response = await axios.post(
      `${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      {
        chatId: `${cleanPhoneNumber}@c.us`,
        message: message.toString(),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error sending message:", err);
  }
};

export const receiveNotification = async (
  idInstance: string,
  apiTokenInstance: string
) => {
  try {
    const response = await axios.get(
      `${API_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data) {
      return null;
    }

    return {
      receiptId: response.data.receiptId,
      body: {
        ...response.data.body,
        messageData: response.data.body?.messageData
          ? {
              ...response.data.body.messageData,
              textMessageData:
                response.data.body.messageData?.textMessageData || {},
            }
          : {},
        senderData: response.data.body?.senderData || {},
      },
    };
  } catch (err) {
    console.error("Error receiving notification:", err);
  }
};

export const deleteNotification = async (
  idInstance: string,
  apiTokenInstance: string,
  receiptId: number
) => {
  try {
    await axios.delete(
      `${API_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("Error deleting notification:", err);
  }
};

export const checkInstanceAuthStatus = async (
  idInstance: string,
  apiTokenInstance: string
) => {
  try {
    const response = await axios.get(
      `${API_URL}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.stateInstance === "authorized";
  } catch (err) {
    console.error("Error checking instance auth status:", err);
  }
};

export const getInstanceSettings = async (
  idInstance: string,
  apiTokenInstance: string
) => {
  try {
    const response = await axios.get(
      `${API_URL}/waInstance${idInstance}/getSettings/${apiTokenInstance}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error getting instance settings:", err);
  }
};

export const setInitialInstanceSettings = async (
  idInstance: string,
  apiTokenInstance: string
) => {
  try {
    const { stateWebhook, outgoingWebhook, incomingWebhook } =
      await getInstanceSettings(idInstance, apiTokenInstance);
    if (
      stateWebhook === "yes" ||
      outgoingWebhook === "yes" ||
      incomingWebhook === "yes"
    ) {
      return;
    }
    const response = await axios.get(
      `${API_URL}/waInstance${idInstance}/setSettings/${apiTokenInstance}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          outgoingWebhook: "yes",
          stateWebhook: "yes",
          incomingWebhook: "yes",
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("Error configuring initial instance settings:", err);
  }
};
