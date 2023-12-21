import { Token } from "@app/models/shared/api/auth/token";
import { create } from "zustand";

export interface AuthState {
  token: Token;
  setToken: (token: Token) => void;
}

export const useApiAuthStore = create<AuthState>((set) => ({
  token: {} as Token,
  setToken: (token: Token) => set(() => ({ token })),
}));
