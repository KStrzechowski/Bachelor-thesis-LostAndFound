export interface ProfileRequestType {
  userId: string;
  email?: string;
  username?: string;
}

export interface AuthorResponseType {
  userId: string;
  username?: string;
  pictureUrl?: string;
}

export interface ProfileResponseType {
  userId: string;
  email?: string;
  username?: string;
  name?: string;
  surname?: string;
  description?: string;
  city?: string;
  pictureUrl?: string;
  averageProfileRating: number;
}
