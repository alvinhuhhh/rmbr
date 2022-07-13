interface ITodo {
  _id?: ObjectId;
  createdBy: string;
  createdDate: Date;
  updatedBy?: string;
  updatedDate?: Date;
  title: string;
  description?: string;
  done: boolean;
}

interface IList {
  _id?: ObjectId;
  createdBy: string;
  createdDate: Date;
  updatedBy?: string;
  updatedDate?: Date;
  title: string;
  todos: ITodo[];
}

interface IUser {
  _id?: ObjectId;
  email: string;
  createdDate: Date;
  updatedDate?: Date;
  lists: IList[];
}
