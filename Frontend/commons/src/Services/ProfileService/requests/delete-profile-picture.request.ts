import { http } from "../../../http";
import { ProfileResponseType } from "../profileTypes";

export const deleteProfilePhoto = async (): Promise<boolean | undefined> => {
  const result = await http<ProfileResponseType>({
    path: `/profile/photo`,
    method: "delete",
  });

  if (result.ok && result.body) {
    return true;
  } else {
    return undefined;
  }
};
