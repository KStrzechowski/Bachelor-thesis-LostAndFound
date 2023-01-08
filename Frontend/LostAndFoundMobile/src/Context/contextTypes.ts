import React from 'react';

export const AuthContext = React.createContext({
  signIn: async () => {},
  signOut: async () => {},
});

export const ProfileContext = React.createContext({
  updatePhotoUrl: async () => {},
  updatePhotoUrlValue: false,
  updateChats: async () => {},
  updateChatsValue: false,
  updateUnreadChatsCount: async () => {},
  unreadChatsCount: 0,
});
