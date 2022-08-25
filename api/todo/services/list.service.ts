import User from "../models/user";
import { IList } from "../types/list.types";

export default class ListService {
  public static async GetLists(email: string): Promise<Array<IList> | undefined> {
    try {
      const user = await User.findOne({ email: email });
      if (user) return user.lists.filter((list) => !list.deleted);
    } catch (err) {
      console.log(err);
    }
  }

  public static async GetListById(email: string, listId: string): Promise<IList | undefined> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const list = user.lists.id(listId);
        if (list && !list.deleted) return list;
      }
    } catch (err) {
      console.log(err);
    }
  }

  public static async CreateList(email: string, list: IList): Promise<boolean> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        // Create list
        list.createdBy = email;
        list.createdDate = new Date();
        list.deleted = false;
        user.lists.push(list);
        await user.save();

        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  public static async UpdateList(email: string, list: IList): Promise<boolean> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const existingList = user.lists.id(list._id);
        if (existingList) {
          existingList.updatedBy = email;
          existingList.updatedDate = new Date();
          existingList.title = list.title;
          existingList.todos = list.todos;
          await user.save();

          return true;
        }
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  public static async DeleteList(email: string, listId: string): Promise<boolean> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const existingList = user.lists.id(listId);
        if (existingList) {
          existingList.updatedBy = email;
          existingList.updatedDate = new Date();
          existingList.deleted = true;
          await user.save();

          return true;
        }
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
