export interface Message {
  id: string;
  text: string;
  timestamp: number;
  isOutgoing: boolean;
  isRead: boolean;
}

export interface Chat {
  phoneNumber: string;
  messages: Message[];
}

export interface AuthState {
  idInstance: string;
  apiTokenInstance: string;
  isAuthenticated: boolean;
  setIdInstance: (idInstance: string) => void;
  setApiTokenInstance: (apiTokenInstance: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}
