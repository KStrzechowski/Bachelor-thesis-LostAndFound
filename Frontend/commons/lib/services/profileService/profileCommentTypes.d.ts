import { AuthorResponseType } from "./profileTypes";
export declare type ProfileCommentRequestType = {
    content?: string;
    profileRating: number;
};
export declare type ProfileCommentResponseType = {
    author: AuthorResponseType;
    content?: string;
    profileRating: number;
    creationDate: Date;
};
export declare type ProfileCommentsSectionResponseType = {
    myComment: ProfileCommentResponseType;
    comments: ProfileCommentResponseType[];
};
export declare type ProfileCommentFromServerType = {
    author: AuthorResponseType;
    content?: string;
    profileRating: number;
    creationDate: string;
};
export declare const mapProfileCommentFromServer: (comment: ProfileCommentFromServerType) => ProfileCommentResponseType;
export declare type ProfileCommentsSectionFromServerType = {
    myComment: ProfileCommentFromServerType;
    comments: ProfileCommentFromServerType[];
};
export declare const mapProfileCommentsSectionFromServer: (data: ProfileCommentsSectionFromServerType) => ProfileCommentsSectionResponseType;
