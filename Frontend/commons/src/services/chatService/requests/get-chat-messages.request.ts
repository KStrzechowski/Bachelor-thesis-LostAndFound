import { http } from "../../../http";
import {
  mapMessageFromServer,
  MessageFromServerResponseType,
  MessageResponseType,
} from "../messageTypes";

export const getChatMessages = async (
  recipentId: string,
  accessToken: string,
  pageNumber?: number
): Promise<MessageResponseType[]> => {
  const result = await http<MessageFromServerResponseType[]>({
    path: `/chat/message/${recipentId}${
      pageNumber ? `?pageNumber=${pageNumber}` : ""
    }`,
    method: "get",
    accessToken,
  });

  if (result.ok && result.body) {
    return result.body.map(mapMessageFromServer);
  } else {
    return [];
  }
};
