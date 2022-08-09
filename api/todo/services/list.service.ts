import { Types } from "mongoose";
import User from "../models/user";
import { IList } from "../types/list.types";

export default class ListService {
  public static async GetLists(email: string): Promise<Types.DocumentArray<IList> | undefined> {
    try {
      const user = await User.findOne({ email: email });
      if (user) return user.lists;
    } catch (err) {
      console.log(err);
    }
  }

  public static async GetListById(
    email: string,
    listId: string
  ): Promise<(Types.Subdocument<Types.ObjectId> & IList) | undefined> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const list = user.lists.id(listId);
        if (list) return list;
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
        // Delete list
        user.lists.pull(listId);
        await user.save();

        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
