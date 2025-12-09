export type TRoundStatus = "cooldown" | "active" | "finished";

export interface IRound {
  id: string;
  startTime: string;
  endTime: string;
  status: TRoundStatus;
  totalScore?: number;
}

export interface IRoundWithPoints extends IRound {
  myPoints: number;
}

export interface IPlayerStats {
  username: string;
  score: number;
  taps: number;
}

export interface IRoundStats {
  totalPoints: number;
  topStats: IPlayerStats[];
  myPoints: number;
}

// API Response types
export interface IApiRound {
  id: string;
  startTime: string;
  endTime: string;
  totalScore: number;
  createdAt: string;
}

interface IApiTopStats {
  taps: number;
  score: number;
  user: { username: string };
}
export interface IApiRoundDetailResponse {
  round: IApiRound;
  topStats: IApiTopStats[];
  myStats: {
    taps: number;
    score: number;
  };
}

export interface IApiRoundsResponse {
  data: IApiRound[];
  pagination: {
    limit: number;
    nextCursor: string | null;
    hasMore: boolean;
  };
}
