import { ProfileCommentsSectionResponseType } from "../profileCommentTypes";
export declare const getProfileComments: (userId: string, accessToken: string, pageNumber?: number) => Promise<ProfileCommentsSectionResponseType | undefined>;
