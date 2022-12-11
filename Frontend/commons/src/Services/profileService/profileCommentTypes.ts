import { ProfileResponseType } from "./profileTypes";

export interface ProfileCommentRequestType {
  content?: string;
  profileRating: number;
}

export interface ProfileCommentResponseType {
  author: ProfileResponseType;
  content?: string;
  profileRating: number;
  creationDate: Date;
}

export interface ProfileCommentsSectionResponseType {
  myComment: ProfileCommentResponseType;
  comments: ProfileCommentResponseType[];
}
