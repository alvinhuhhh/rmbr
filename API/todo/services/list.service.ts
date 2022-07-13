import User from "../models/user";
import { IUser } from "../types/user.types";
import { IList } from "../types/list.types";

export default class ListService {
  public static async GetLists(email: string) {
    try {
      const query = User.where({ email: email });
      const user: IUser | null = await query.findOne();
      if (user) return user.lists;
      return null;
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
      return null;
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
        // Create list
        list.createdBy = email;
        list.createdDate = new Date();
        user.lists.push(list);
        await user.save();

        return true;
      }
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async UpdateList(email: string, list: IList) {
    try {
      const query = User.where({ email: email });
      const user = await query.findOne();
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async DeleteList(email: string, listId: string) {
    try {
      const query = User.where({ email: email });
      const user = await query.findOne();
      if (user) {
        // Delete list
        user.lists.pull(listId);
        await user.save();

        return true;
      }
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
