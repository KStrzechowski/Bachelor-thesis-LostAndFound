import { http } from "../../../http";
import { ChatNotificationResponseType } from "../chatTypes";

export const getChatMessages = async (
  accessToken: string
): Promise<ChatNotificationResponseType[]> => {
  const result = await http<ChatNotificationResponseType[]>({
    path: "/chat/notification",
    method: "get",
    accessToken,
  });

  if (result.ok && result.body) {
    return result.body;
  } else {
    return [];
  }
};
