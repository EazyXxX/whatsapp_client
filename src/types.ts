export interface Message {
  id: string;
  text: string;
  timestamp: number;
  isOutgoing: boolean;
}

export interface Chat {
  phoneNumber: string;
  messages: Message[];
}

export interface AuthState {
  idInstance: string;
  apiTokenInstance: string;
  isAuthenticated: boolean;
  setidInstance: (idInstance: string) => void;
  setapiTokenInstance: (apiTokenInstance: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}
