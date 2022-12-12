import { ProfileResponseType } from "./profileTypes";
export type ProfileCommentRequestType = {
    content?: string;
    profileRating: number;
};
export type ProfileCommentResponseType = {
    author: ProfileResponseType;
    content?: string;
    profileRating: number;
    creationDate: Date;
};
export type ProfileCommentsSectionResponseType = {
    myComment: ProfileCommentResponseType;
    comments: ProfileCommentResponseType[];
};
export type ProfileCommentFromServerType = {
    author: ProfileResponseType;
    content?: string;
    profileRating: number;
    creationDate: string;
};
export declare const mapProfileCommentFromServer: (comment: ProfileCommentFromServerType) => ProfileCommentResponseType;
export type ProfileCommentsSectionFromServerType = {
    myComment: ProfileCommentFromServerType;
    comments: ProfileCommentFromServerType[];
};
export declare const mapProfileCommentsSectionFromServer: (data: ProfileCommentsSectionFromServerType) => ProfileCommentsSectionResponseType;
