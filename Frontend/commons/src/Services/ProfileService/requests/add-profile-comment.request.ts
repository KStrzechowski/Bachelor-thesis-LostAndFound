import { http } from "../../../http";
import {
  ProfileCommentRequestType,
  ProfileCommentResponseType,
  ProfileCommentFromServerType,
  mapProfileCommentFromServer,
} from "../profileCommentTypes";

export const addProfileComment = async (
  userId: string,
  comment: ProfileCommentRequestType
): Promise<ProfileCommentResponseType | undefined> => {
  const result = await http<
    ProfileCommentFromServerType,
    ProfileCommentRequestType
  >({
    path: `/profile/${userId}/comments`,
    method: "post",
  });

  if (result.ok && result.body) {
    return mapProfileCommentFromServer(result.body);
  } else {
    return undefined;
  }
};
