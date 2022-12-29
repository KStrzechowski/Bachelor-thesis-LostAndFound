import { http } from "../../../http";
import { mapPublicationFromServer, } from "../publicationTypes";
export const getPublications = async (pageNumber, accessToken, publication) => {
    let path = `/publication?pageNumber=${pageNumber}`;
    if (publication) {
        if (publication.title) {
            path = path.concat(`&SearchQuery=${publication.title}`);
        }
        if (publication.incidentAddress) {
            path = path.concat(`&IncidentAddress=${publication.incidentAddress}`);
        }
        if (publication.incidentDistance) {
            path = path.concat(`&SearchRadius=${publication.incidentDistance}`);
        }
        if (publication.incidentFromDate) {
            path = path.concat(`&FromDate=${publication.incidentFromDate}`);
        }
        if (publication.incidentToDate) {
            path = path.concat(`&ToDate=${publication.incidentToDate}`);
        }
        if (publication.publicationState) {
            path = path.concat(`&PublicationState=${publication.publicationState}`);
        }
        if (publication.publicationType) {
            path = path.concat(`&PublicationType=${publication.publicationType}`);
        }
        if (publication.subjectCategoryId) {
            path = path.concat(`&SubjectCategoryId=${publication.subjectCategoryId}`);
        }
    }
    const result = await http({
        path: `/publication?pageNumber=${pageNumber}`,
        method: "get",
        accessToken,
    });
    if (result.ok && result.body) {
        return result.body.map(mapPublicationFromServer);
    }
    else {
        return [];
    }
};
