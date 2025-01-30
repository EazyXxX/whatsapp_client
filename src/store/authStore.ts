import { create } from "zustand";
import { AuthState } from "../types";

export const useAuthStore = create<AuthState>((set) => ({
  idInstance: "",
  apiTokenInstance: "",
  isAuthenticated: false,
  setIdInstance: (idInstance) => set({ idInstance }),
  setApiTokenInstance: (apiTokenInstance) => set({ apiTokenInstance }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));
