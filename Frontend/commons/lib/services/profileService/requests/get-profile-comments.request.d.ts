import { ProfileCommentsSectionResponseType } from "../profileCommentTypes";
export declare const getProfileComments: (userId: string, accessToken: string) => Promise<ProfileCommentsSectionResponseType | undefined>;
