export interface Chat {
  _id: string;
  userId1: string;
  userId2: string;
  messages: Message[];
}

export interface Message {
  _id: string;
  userId: string;
  content: string;
  sentDateTime: Date;
}
