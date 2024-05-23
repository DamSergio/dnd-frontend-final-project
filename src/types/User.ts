import { Invitation } from "./Invitation";

export type SignUpUser = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  profilePicture: string;
  rol: string;
  accessToken: string;
  invitations: Invitation[];
};
