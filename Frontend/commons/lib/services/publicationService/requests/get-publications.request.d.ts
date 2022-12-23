import { PublicationResponseType, PublicationSearchRequestType } from "../publicationTypes";
export declare const getPublications: (pageNumber: number, accessToken: string, publication?: PublicationSearchRequestType | undefined) => Promise<PublicationResponseType[]>;
