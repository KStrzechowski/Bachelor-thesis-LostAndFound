export interface Profile {
  _id: string;
  userId: string;
  email: string;
  username: string;
  name: string;
  surname: string;
  city: string;
  photoId: string;
  profileDescription: string;
  averageScore: string;
  votes: Vote[];
}

export interface Vote {
  _id: string;
  userId: string;
  score: number;
  comment: string;
  date: Date;
  editDate: Date;
}
