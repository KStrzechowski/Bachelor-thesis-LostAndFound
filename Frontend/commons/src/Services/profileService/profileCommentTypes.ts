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

export const mapProfileCommentFromServer = (
  comment: ProfileCommentFromServerType
): ProfileCommentResponseType => ({
  ...comment,
  creationDate: new Date(comment.creationDate),
});

export type ProfileCommentsSectionFromServerType = {
  myComment: ProfileCommentFromServerType;
  comments: ProfileCommentFromServerType[];
};

export const mapProfileCommentsSectionFromServer = (
  data: ProfileCommentsSectionFromServerType
): ProfileCommentsSectionResponseType => ({
  myComment: mapProfileCommentFromServer(data.myComment),
  comments: data.comments.map(mapProfileCommentFromServer),
});
