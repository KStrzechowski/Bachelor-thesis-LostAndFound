export enum SinglePublicationVote {
  NoVote,
  Up,
  Down,
}

export enum PublicationType {
  LostSubject,
  FoundSubject,
}

export enum PublicationState {
  Open,
  Closed,
}

export type CategoryType = {
  id?: string;
  displayName?: string;
};

export type UserType = {
  id: string;
  username?: string;
};

export type PublicationRatingRequestType = {
  newPublicationVote: SinglePublicationVote;
};

export type PublicationStateRequestType = {
  publicationState: PublicationState;
};

export type PublicationRequestType = {
  title?: string;
  description?: string;
  incidentAddress?: string;
  incidentDate: Date;
  subjectCategoryId?: string;
  publicationType: PublicationType;
  publicationState: PublicationState;
};

export type PublicationResponseType = {
  publicationId: string;
  title?: string;
  description?: string;
  subjectPhotoUrl?: string;
  incidentAddress?: string;
  incidentDate: Date;
  aggregateRaing: number;
  userVote: SinglePublicationVote;
  subjectCategoryId?: string;
  publicationType: PublicationType;
  publicationState: PublicationState;
  lastModificationDate: Date;
  creationDate: Date;
  author: UserType;
};

export type PublicationFromServerType = {
  publicationId: string;
  title?: string;
  description?: string;
  subjectPhotoUrl?: string;
  incidentAddress?: string;
  incidentDate: string;
  aggregateRaing: number;
  userVote: SinglePublicationVote;
  subjectCategoryId?: string;
  publicationType: PublicationType;
  publicationState: PublicationState;
  lastModificationDate: string;
  creationDate: string;
  author: UserType;
};

export const mapPublicationFromServer = (
  publication: PublicationFromServerType
): PublicationResponseType => ({
  ...publication,
  incidentDate: new Date(publication.incidentDate),
  lastModificationDate: new Date(publication.lastModificationDate),
  creationDate: new Date(publication.creationDate),
});