import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store";
import type { IUser } from "@/types";
import { API_URL } from "@/constants";

interface ILoginRequest {
  username: string;
  password: string;
}

interface ILoginResponse {
  token: string;
}

// Отдельный API для авторизации с реальным бэкендом
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    login: build.mutation<ILoginResponse, ILoginRequest>({
      query: (body) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body,
      }),
    }),

    me: build.query<IUser, void>({
      query: () => "/api/v1/auth/me",
      transformResponse: (response: { username: string; role: string; id?: string }) => ({
        id: response.id ?? response.username,
        username: response.username,
        isAdmin: response.role === "ADMIN",
      }),
    }),

    logout: build.mutation<void, void>({
      query: () => ({
        url: "/api/v1/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useMeQuery, useLogoutMutation, useLazyMeQuery } = authApi;
