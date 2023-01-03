import { http } from "../../../http";
import { ChatBaseResponseType } from "../chatTypes";

export const getChats = async (
  accessToken: string,
  pageNumber?: number
): Promise<ChatBaseResponseType[]> => {
  const result = await http<ChatBaseResponseType[]>({
    path: `/chat${pageNumber ? `?pageNumber=${pageNumber}` : ""}`,
    method: "get",
    accessToken,
  });

  if (result.ok && result.body) {
    return result.body;
  } else {
    return [];
  }
};
