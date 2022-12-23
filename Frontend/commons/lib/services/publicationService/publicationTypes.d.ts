export declare enum SinglePublicationVote {
    NoVote = "NoVote",
    Up = "Up",
    Down = "Down"
}
export declare enum PublicationType {
    LostSubject = "LostSubject",
    FoundSubject = "FoundSubject"
}
export declare enum PublicationState {
    Open = "Open",
    Closed = "Closed"
}
export declare type CategoryType = {
    id?: string;
    displayName?: string;
};
export declare type UserType = {
    id: string;
    username?: string;
};
export declare type PublicationRatingRequestType = {
    newPublicationVote: SinglePublicationVote;
};
export declare type PublicationStateRequestType = {
    publicationState: PublicationState;
};
export declare type PublicationRequestType = {
    title?: string;
    description?: string;
    incidentAddress?: string;
    incidentDate: Date;
    subjectCategoryId?: string;
    publicationType: PublicationType;
    publicationState?: PublicationState;
};
export declare type PublicationResponseType = {
    publicationId: string;
    title?: string;
    description?: string;
    subjectPhotoUrl?: string;
    incidentAddress?: string;
    incidentDate: Date;
    aggregateRating: number;
    userVote: SinglePublicationVote;
    subjectCategoryId?: string;
    publicationType: PublicationType;
    publicationState: PublicationState;
    lastModificationDate: Date;
    creationDate: Date;
    author: UserType;
};
export declare type PublicationFromServerType = {
    publicationId: string;
    title?: string;
    description?: string;
    subjectPhotoUrl?: string;
    incidentAddress?: string;
    incidentDate: string;
    aggregateRating: number;
    userVote: SinglePublicationVote;
    subjectCategoryId?: string;
    publicationType: PublicationType;
    publicationState: PublicationState;
    lastModificationDate: string;
    creationDate: string;
    author: UserType;
};
export declare const mapPublicationFromServer: (publication: PublicationFromServerType) => PublicationResponseType;
export declare type PublicationSearchRequestType = {
    title?: string;
    incidentAddress?: string;
    incidentDistance?: number;
    incidentFromDate?: Date;
    incidentToDate?: Date;
    subjectCategoryId?: string;
    publicationType?: PublicationType;
    publicationState?: PublicationState;
};
