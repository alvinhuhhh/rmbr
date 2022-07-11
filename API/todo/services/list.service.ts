import List from "../models/list";
import User from "../models/user";

export default class ListService {
  public static async GetLists(email: string) {
    try {
      const query = User.where({ email: email });
      const user = await query.findOne();
      if (user) return user.lists;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async GetListById(email: string, listId: string) {
    try {
      const query = User.find({ email: email, "lists._id": listId });
      const list = await query.findOne();
      if (list) return list;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async CreateList(email: string, list: IList) {
    try {
      const query = User.where({ email: email });
      const user = await query.findOne();
      if (user) {
        list.createdBy = email;
        list.createdDate = new Date();

        user.lists = [...user.lists, list];
        user.save();
        return true;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async UpdateList() {
    try {
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async DeleteList() {
    try {
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
