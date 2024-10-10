export type Notification = {
  _id: string;
  ownerId: string;
  content: string;
  createdAt: Date;
  viewedByOwner: boolean;
};
