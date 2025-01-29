import { create } from "zustand";
import { AuthState } from "../types";

export const useAuthStore = create<AuthState>((set) => ({
  idInstance: import.meta.env.ID_INSTANCE,
  apiTokenInstance: import.meta.env.API_TOKEN_INSTANCE,
  isAuthenticated: false,
  setidInstance: (idInstance) => set({ idInstance }),
  setapiTokenInstance: (apiTokenInstance) => set({ apiTokenInstance }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));
