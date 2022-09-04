export interface ISharing {
  _id?: number;
  createdDate: Date;
  updatedDate?: Date;
  owner: string;
  users: Array<{ email: string }>;
  listId: number;
}
