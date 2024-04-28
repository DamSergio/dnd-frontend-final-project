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
  username: string;
  email: string;
  profilePicture: string;
  characters: [];
  rol: string;
  token: string;
};
