export interface LoginRequestType {
  email: string;
  password: string;
}

export interface LoginResponseType {
  accessToken: string;
  accessTokenExpirationTime: Date;
  refreshToken: string;
}
