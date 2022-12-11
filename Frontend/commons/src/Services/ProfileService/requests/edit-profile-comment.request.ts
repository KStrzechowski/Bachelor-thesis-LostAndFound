import { http } from "../../../http";
import {
  ProfileCommentRequestType,
  ProfileCommentResponseType,
  ProfileCommentFromServerType,
  mapProfileCommentFromServer,
} from "../profileCommentTypes";

export const editProfileComment = async (
  userId: string,
  comment: ProfileCommentRequestType
): Promise<ProfileCommentResponseType | undefined> => {
  const result = await http<
    ProfileCommentFromServerType,
    ProfileCommentRequestType
  >({
    path: `/profile/${userId}/comments`,
    method: "put",
  });

  if (result.ok && result.body) {
    return mapProfileCommentFromServer(result.body);
  } else {
    return undefined;
  }
};
