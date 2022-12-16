import React from 'react';

export const AccessToken = 'Access-Token';
export const RefreshToken = 'Refresh-Token';
export const TokenExpirationDate = 'Token-Expiration';

export const AuthContext = React.createContext({
  signIn: async () => {},
  signOut: async () => {},
});
