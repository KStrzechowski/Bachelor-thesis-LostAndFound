import { http } from "../../../http";
import { ProfileResponseType } from "../profileTypes";

export const getProfileDetails = async (
  userId: string
): Promise<ProfileResponseType | undefined> => {
  const result = await http<ProfileResponseType>({
    path: `/profile/${userId}`,
    method: "get",
  });

  if (result.ok && result.body) {
    return result.body;
  } else {
    return undefined;
  }
};
