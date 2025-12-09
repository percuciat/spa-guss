export interface IUser {
  id: string;
  username: string;
  isAdmin: boolean;
}

export interface IAuthState {
  user: IUser | null;
  token: string | null;
}

export type TLoginFormData = {
  username: string;
  password: string;
};
