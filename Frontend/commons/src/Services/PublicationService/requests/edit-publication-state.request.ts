import { http } from "../../../http";
import {
  PublicationResponseType,
  PublicationFromServerType,
  mapPublicationFromServer,
  PublicationState,
} from "../publicationTypes";

export const editPublicationState = async (
  publicationId: string,
  state: PublicationState
): Promise<PublicationResponseType | undefined> => {
  const result = await http<
    PublicationFromServerType,
    { publicationState: PublicationState }
  >({
    path: `/pulication/${publicationId}`,
    method: "patch",
    body: { publicationState: state },
  });

  if (result.ok && result.body) {
    return mapPublicationFromServer(result.body);
  } else {
    return undefined;
  }
};
