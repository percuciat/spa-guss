import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/constants";
import { computeRoundStatus } from "@/utils/time";
import type { RootState } from "@/store";
import type {
  IRound,
  IRoundWithPoints,
  IRoundStats,
  IApiRoundsResponse,
  IApiRoundDetailResponse,
  IApiRound,
} from "@/types";

interface ICreateRoundRequest {
  startTime: string;
  endTime: string;
}

interface ITapResponse {
  taps: number;
  score: number;
}

// Преобразование API раунда в клиентский формат
function transformRound(apiRound: IApiRound): IRound {
  return {
    id: apiRound.id,
    startTime: apiRound.startTime,
    endTime: apiRound.endTime,
    status: computeRoundStatus(apiRound.startTime, apiRound.endTime),
    totalScore: apiRound.totalScore,
  };
}

// API для раундов
export const roundsApi = createApi({
  reducerPath: "roundsApi",
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
  tagTypes: ["Rounds"],
  endpoints: (build) => ({
    // GET /api/v1/rounds
    getRounds: build.query<IRound[], void>({
      query: () => "/api/v1/rounds",
      transformResponse: (response: IApiRoundsResponse) => response.data.map(transformRound),
      providesTags: ["Rounds"],
    }),

    // GET /api/v1/rounds/{id}
    getRound: build.query<IRoundWithPoints, string>({
      query: (id) => `/api/v1/rounds/${id}`,
      transformResponse: (response: IApiRoundDetailResponse): IRoundWithPoints => ({
        ...transformRound(response.round),
        myPoints: response.myStats?.score ?? 0,
      }),
      providesTags: ["Rounds"],
    }),

    // POST /api/v1/rounds
    createRound: build.mutation<IRound, ICreateRoundRequest>({
      query: (body) => ({
        url: "/api/v1/rounds",
        method: "POST",
        body,
      }),
      transformResponse: (apiRound: IApiRound) => transformRound(apiRound),
      invalidatesTags: ["Rounds"],
    }),

    // POST /api/v1/rounds/{id}/tap
    tap: build.mutation<ITapResponse, string>({
      query: (roundId) => ({
        url: `/api/v1/rounds/${roundId}/tap`,
        method: "POST",
      }),
    }),

    // Статистика раунда
    getRoundStats: build.query<IRoundStats, string>({
      query: (roundId) => `/api/v1/rounds/${roundId}`,
      transformResponse: (response: IApiRoundDetailResponse): IRoundStats => ({
        totalPoints: response.round.totalScore ?? 0,
        topStats: (response.topStats ?? []).map((stat) => ({
          username: stat.user.username,
          score: stat.score,
          taps: stat.taps,
        })),
        myPoints: response.myStats?.score ?? 0,
      }),
    }),
  }),
});

export const {
  useGetRoundsQuery,
  useGetRoundQuery,
  useCreateRoundMutation,
  useTapMutation,
  useGetRoundStatsQuery,
} = roundsApi;
