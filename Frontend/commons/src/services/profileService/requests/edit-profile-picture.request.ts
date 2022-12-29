import { http } from "../../../http";
import { ProfileResponseType } from "../profileTypes";

export const editProfilePhoto = async (
  photo: string,
  accessToken: string
): Promise<ProfileResponseType | undefined> => {
  const result = await http<ProfileResponseType, string>({
    path: "/profile/picture",
    method: "patch",
    body: photo,
    accessToken,
  });

  if (result.ok && result.body) {
    return result.body;
  } else {
    return undefined;
  }
};
