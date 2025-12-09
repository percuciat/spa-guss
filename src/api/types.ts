export interface ICreateRoundRequest {
  startTime: string;
  endTime: string;
}

export interface ITapResponse {
  taps: number;
  score: number;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}
