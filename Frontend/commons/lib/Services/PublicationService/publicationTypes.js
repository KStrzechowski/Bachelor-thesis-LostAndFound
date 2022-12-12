export var SinglePublicationVote;
(function (SinglePublicationVote) {
    SinglePublicationVote[SinglePublicationVote["NoVote"] = 0] = "NoVote";
    SinglePublicationVote[SinglePublicationVote["Up"] = 1] = "Up";
    SinglePublicationVote[SinglePublicationVote["Down"] = 2] = "Down";
})(SinglePublicationVote || (SinglePublicationVote = {}));
export var PublicationType;
(function (PublicationType) {
    PublicationType[PublicationType["LostSubject"] = 0] = "LostSubject";
    PublicationType[PublicationType["FoundSubject"] = 1] = "FoundSubject";
})(PublicationType || (PublicationType = {}));
export var PublicationState;
(function (PublicationState) {
    PublicationState[PublicationState["Open"] = 0] = "Open";
    PublicationState[PublicationState["Closed"] = 1] = "Closed";
})(PublicationState || (PublicationState = {}));
export const mapPublicationFromServer = (publication) => ({
    ...publication,
    incidentDate: new Date(publication.incidentDate),
    lastModificationDate: new Date(publication.lastModificationDate),
    creationDate: new Date(publication.creationDate),
});
