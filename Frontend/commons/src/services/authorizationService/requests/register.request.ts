import { http } from "../../../http";
import { RegisterRequestType, RegisterResponseType } from "../registerTypes";

export const register = async (
  user: RegisterRequestType
): Promise<RegisterResponseType | undefined> => {
  const result = await http<RegisterResponseType, RegisterRequestType>({
    path: "/account/register",
    method: "post",
    body: user,
  });

  if (result.ok && result.body) {
    return result.body;
  } else {
    return undefined;
  }
};
