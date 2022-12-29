export type ProfileRequestType = {
    name?: string;
    surname?: string;
    description?: string;
    city?: string;
};
export type AuthorResponseType = {
    id: string;
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
