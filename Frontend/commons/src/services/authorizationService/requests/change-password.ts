import { http } from "../../../http";
import { ChangePasswordRequestType } from "../loginTypes";

export const changePassword = async (
  passwords: ChangePasswordRequestType,
  accessToken: string
): Promise<boolean> => {
  const result = await http<undefined, ChangePasswordRequestType>({
    path: `/account/password`,
    method: "put",
    body: passwords,
    accessToken,
  });

  if (result.ok) {
    return true;
  } else {
    return false;
  }
};
