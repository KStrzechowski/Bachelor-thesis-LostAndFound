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

export interface CategoryType {
  id?: string;
  displayName?: string;
}

export interface UserType {
  id: string;
  username?: string;
}

export interface PublicationRatingRequestType {
  newPublicationVote: SinglePublicationVote;
}

export interface PublicationStateRequestType {
  publicationState: PublicationState;
}

export interface PublicationRequestType {
  title?: string;
  description?: string;
  incidentAddress?: string;
  incidentDate: Date;
  subjectCategoryId?: string;
  publicationType: PublicationType;
  publicationState: PublicationState;
}

export interface PublicationResponseType {
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
}
