interface ITodo {
  createdBy: string;
  createdDate: Date;
  updatedBy: string | null;
  updatedDate: Date | null;
  title: string;
  description: string | null;
  done: boolean;
}

interface IList {
  createdBy: string;
  createdDate: Date;
  updatedBy: string | null;
  updatedDate: Date | null;
  title: string;
  todos: ITodo[];
}

interface IUser {
  email: string;
  createdDate: Date;
  updatedDate: Date | null;
  lists: IList[];
}
