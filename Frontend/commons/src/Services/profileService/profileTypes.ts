export type ProfileRequestType = {
  userId: string;
  email?: string;
  username?: string;
};

export type AuthorResponseType = {
  userId: string;
  username?: string;
  pictureUrl?: string;
};

export type ProfileResponseType = {
  userId: string;
  email?: string;
  username?: string;
  name?: string;
  surname?: string;
  description?: string;
  city?: string;
  pictureUrl?: string;
  averageProfileRating: number;
};
