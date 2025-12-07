import type { IAuthState } from "@/types";

const AUTH_KEY = "auth";

export const storage = {
  getAuth(): IAuthState | null {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  },

  setAuth(state: IAuthState) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(state));
  },

  clearAuth() {
    localStorage.removeItem(AUTH_KEY);
  },
};

