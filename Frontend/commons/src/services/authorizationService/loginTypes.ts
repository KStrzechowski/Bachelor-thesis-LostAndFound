export type LoginRequestType = {
  email: string;
  password: string;
};

export type LoginResponseType = {
  accessToken: string;
  accessTokenExpirationTime: Date;
  refreshToken: string;
};

export type LoginFromServerType = {
  accessToken: string;
  accessTokenExpirationTime: string;
  refreshToken: string;
};

export const mapLoginFromServer = (
  data: LoginFromServerType
): LoginResponseType => ({
  ...data,
  accessTokenExpirationTime: new Date(data.accessTokenExpirationTime),
});

export type ChangePasswordRequestType = {
  password: string;
  newPassword: string;
};
