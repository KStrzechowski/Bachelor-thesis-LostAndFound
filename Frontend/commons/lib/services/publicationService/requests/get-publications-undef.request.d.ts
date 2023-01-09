import { PublicationResponseType, PublicationSearchRequestType, PublicationSortType } from "../publicationTypes";
export declare const getPublicationsUndef: (pageNumber: number, accessToken: string, publication?: PublicationSearchRequestType, orderBy?: {
    firstArgumentSort: PublicationSortType;
    secondArgumentSort?: PublicationSortType;
}) => Promise<PublicationResponseType[] | undefined>;
