import React from 'react';

export const USER_ID = 'UserId';
export const ACCESS_TOKEN = 'Access-Token';
export const REFRESH_TOKEN = 'Refresh-Token';
export const TOKEN_EXPIRATION_DATE = 'Token-Expiration';

export const AuthContext = React.createContext({
  signIn: async () => {},
  signOut: async () => {},
});
