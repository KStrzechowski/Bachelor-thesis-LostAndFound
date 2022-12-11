import { http } from "../../../http";
import {
  mapProfileCommentsSectionFromServer,
  ProfileCommentsSectionFromServerType,
  ProfileCommentsSectionResponseType,
} from "../profileCommentTypes";

export const getProfileComments = async (
  userId: string
): Promise<ProfileCommentsSectionResponseType | undefined> => {
  const result = await http<ProfileCommentsSectionFromServerType>({
    path: `/profile/${userId}/comments`,
    method: "get",
  });

  if (result.ok && result.body) {
    return mapProfileCommentsSectionFromServer(result.body);
  } else {
    return undefined;
  }
};
