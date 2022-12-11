import { http } from "../../../http";
import {
  PublicationResponseType,
  SinglePublicationVote,
  PublicationFromServerType,
  mapPublicationFromServer,
} from "../publicationTypes";

export const editPublicationRating = async (
  publicationId: string,
  rating: SinglePublicationVote
): Promise<PublicationResponseType | undefined> => {
  const result = await http<
    PublicationFromServerType,
    { newPublicationVote: SinglePublicationVote }
  >({
    path: `/pulication/${publicationId}/rating`,
    method: "patch",
    body: { newPublicationVote: rating },
  });

  if (result.ok && result.body) {
    return mapPublicationFromServer(result.body);
  } else {
    return undefined;
  }
};
