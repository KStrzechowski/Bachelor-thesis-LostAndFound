import { getProfile, getProfileDetails } from "commons";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { userContext } from "userContext";
import ProfileComments from "./profileComments";
import { FiEdit, FiStar } from "react-icons/fi";

export default function Profile() {
  const usrCtx = useContext(userContext);
  const [prof, setProf] = useState(undefined as UserProfile | undefined);
  useEffect(() => {
    if (usrCtx.user.authToken !== null)
      getProfile(usrCtx.user.authToken).then((x) => {
        if (x !== undefined) {
          setProf({
            uId: x.userId,
            username: x.username,
            name: x.name,
            surname: x.surname,
            email: x.email,
            description: x.description,
            city: x.city,
            averageProfileRating: x.averageProfileRating,
            pictureUrl:
              x.pictureUrl ??
              "https://avatars.dicebear.com/api/bottts/stefan.svg",
            me: true,
          });
        } else {
          usrCtx.setUser({ authToken: "", isLogged: false });
        }
      });
  }, []);
  if (prof === undefined) return <div>...</div>;
  return <ProfileInner profile={prof}></ProfileInner>;
}

export function ProfileOther() {
  let { userId } = useParams();
  const usrCtx = useContext(userContext);
  const [prof, setProf] = useState(undefined as UserProfile | undefined);
  useEffect(() => {
    console.log(userId);
    if (usrCtx.user.authToken !== null && userId !== undefined)
      getProfileDetails(userId, usrCtx.user.authToken).then((x) => {
        if (x !== undefined) {
          setProf({
            uId: x.userId,
            username: x.username,
            name: x.name,
            surname: x.surname,
            email: x.email,
            description: x.description,
            city: x.city,
            averageProfileRating: x.averageProfileRating,
            pictureUrl:
              x.pictureUrl ??
              "https://avatars.dicebear.com/api/bottts/stefan.svg",
            me: false,
          });
        } else {
          usrCtx.setUser({ authToken: "", isLogged: false });
        }
      });
  }, [userId]);
  if (prof === undefined) return <div>...</div>;
  return <ProfileInner profile={prof}></ProfileInner>;
}

export function ProfileInner({ profile }: { profile: UserProfile }) {
  return (
    <div
      data-testid="profileInner"
      className="w-50 border border-1 border-dark m-auto rounded-4 bg-light p-3 container shadow-lg"
    >
      <div className="row">
        <img
          className="img-fluid "
          style={{ width: "350px" }}
          src={profile.pictureUrl}
          alt="profileImage"
        ></img>

        <div className="col text-start p-2">
          <div className="h1 d-flex">
            <h1>{profile.username}</h1>
            {profile.me && (
              <Link className="text-dark btn float-end" to="/profile/edit">
                <FiEdit size="38" />
              </Link>
            )}
            <div
              className="align-self-center ms-auto me-4"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span>{profile.averageProfileRating}</span>
              <FiStar className="ms-2 mt-1" fill="#ffc107" color="#ffc107" />
            </div>
          </div>
          <div className="p-2">
            <strong className="row">Imie i nazwisko: </strong>
            {profile.name} {profile.surname}
          </div>
          <div className="p-2">
            <strong className="row">Miasto: </strong>
            <span className="p-2 fst-italic">{profile.city}</span>
          </div>
          <div className="p-2 pt-3 fst-italic">
            <strong className="row">Opis: </strong>
            {profile.description}
          </div>
        </div>
      </div>
      <ProfileComments me={profile.me} profId={profile.uId}></ProfileComments>
    </div>
  );
}
export class UserProfile {
  uId: string = "";
  email: string | undefined = "EMPTY";
  username: string | undefined = "EMPTY";
  name: string | undefined = "Adam";
  surname: string | undefined = "Toleracko";
  description: string | undefined =
    "Bardzo lubie pomagac znajdowac zagubione rzeczy.";
  city: string | undefined = "Warszawa";
  averageProfileRating: number | undefined = 4.78;
  pictureUrl: string | undefined =
    "https://xsgames.co/randomusers/avatar.php?g=pixel";
  me: boolean = true;
}
