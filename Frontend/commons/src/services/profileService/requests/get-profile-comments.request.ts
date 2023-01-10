import { http } from "../../../http";
import {
  mapProfileCommentsSectionFromServer,
  ProfileCommentsSectionFromServerType,
  ProfileCommentsSectionResponseType,
} from "../profileCommentTypes";

export const getProfileComments = async (
  userId: string,
  accessToken: string,
  pageNumber: number = 1
): Promise<ProfileCommentsSectionResponseType | undefined> => {
  const result = await http<ProfileCommentsSectionFromServerType>({
    path: `/profile/${userId}/comments?pageNumber=${pageNumber}`,
    method: "get",
    accessToken,
  });

  if (result.ok && result.body) {
    return mapProfileCommentsSectionFromServer(result.body);
  } else {
    return undefined;
  }
};
