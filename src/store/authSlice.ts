import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IAuthState, IUser } from "@/types";
import { storage } from "@/utils/storage";

const initial: IAuthState = storage.getAuth() ?? { user: null, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState: initial,
  reducers: {
    setAuth(
      state,
      action: PayloadAction<{ user: IUser | null; token: string }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      storage.setAuth(state);
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      storage.setAuth(state);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      storage.clearAuth();
    },
  },
});

export const { setAuth, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
