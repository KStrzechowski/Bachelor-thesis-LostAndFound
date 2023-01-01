import { PublicationResponseType, PublicationSearchRequestType } from "../publicationTypes";
export declare const getPublicationsUndef: (pageNumber: number, accessToken: string, publication?: PublicationSearchRequestType) => Promise<PublicationResponseType[] | undefined>;
