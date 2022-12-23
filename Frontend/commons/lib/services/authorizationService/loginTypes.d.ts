export declare type LoginRequestType = {
    email: string;
    password: string;
};
export declare type LoginResponseType = {
    accessToken: string;
    accessTokenExpirationTime: Date;
    refreshToken: string;
};
export declare type LoginFromServerType = {
    accessToken: string;
    accessTokenExpirationTime: string;
    refreshToken: string;
};
export declare const mapLoginFromServer: (data: LoginFromServerType) => LoginResponseType;
