export declare type ProfileRequestType = {
    name?: string;
    surname?: string;
    description?: string;
    city?: string;
};
export declare type AuthorResponseType = {
    id: string;
    username?: string;
    pictureUrl?: string;
};
export declare type ProfileResponseType = {
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
