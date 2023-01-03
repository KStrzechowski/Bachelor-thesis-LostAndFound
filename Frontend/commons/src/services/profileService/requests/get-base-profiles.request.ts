import { http } from "../../../http";
import { AuthorResponseType } from "../profileTypes";

export const getBaseProfiles = async (
  userIds: string[],
  accessToken: string
): Promise<AuthorResponseType[]> => {
  if (userIds.length < 0) {
    return [];
  }
  let path: string = "/profile/list?";
  for (const userId of userIds) {
    path += `userIds=${userId}`;
  }

  const result = await http<AuthorResponseType[]>({
    path,
    method: "get",
    accessToken,
  });

  if (result.ok && result.body) {
    return result.body;
  } else {
    return [];
  }
};
