import { multipartFormDataHttp } from "../../../http";
import {
  PublicationRequestType,
  PublicationResponseType,
  PublicationFromServerType,
  mapPublicationFromServer,
} from "../publicationTypes";

export const addPublication = async (
  publication: PublicationRequestType,
  accessToken: string
): Promise<PublicationResponseType | undefined> => {
  const data: FormData = new FormData();
  if (publication.title) data.append("title", publication.title);
  if (publication.description)
    data.append("description", publication.description);
  if (publication.incidentAddress)
    data.append("incidentAddress", publication.incidentAddress);
  if (publication.incidentDate)
    data.append("incidentDate", publication.incidentDate.toDateString());
  if (publication.publicationType)
    data.append("publicationType", publication.publicationType);
  if (publication.subjectCategoryId)
    data.append("subjectCategoryId", publication.subjectCategoryId);

  const result = await multipartFormDataHttp<PublicationFromServerType>(
    {
      path: "/publication",
      method: "post",
      contentType:
        "multipart/form-data; boundary=------WebKitFormBoundary2lZSUsxEA3X5jpYD",
      accessToken,
    },
    data
  );

  if (result.ok && result.body) {
    return mapPublicationFromServer(result.body);
  } else {
    return undefined;
  }
};
