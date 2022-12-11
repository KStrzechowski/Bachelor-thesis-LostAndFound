import { http } from "../../../http";
import { ProfileResponseType } from "../profileTypes";

export const getProfile = async (): Promise<
  ProfileResponseType | undefined
> => {
  const result = await http<ProfileResponseType>({
    path: "/profile",
    method: "get",
  });

  if (result.ok && result.body) {
    return result.body;
  } else {
    return undefined;
  }
};
