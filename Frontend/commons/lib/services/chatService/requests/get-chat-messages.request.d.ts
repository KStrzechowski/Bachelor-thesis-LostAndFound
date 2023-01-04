import { MessageResponseType } from "../messageTypes";
export declare const getChatMessages: (recipentId: string, accessToken: string, pageNumber?: number) => Promise<MessageResponseType[]>;
