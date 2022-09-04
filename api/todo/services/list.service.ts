import User from "../models/user";
import { IList } from "../types/list.types";
import { IServiceResponse } from "../types/service.types";

export default class ListService {
  public static async GetLists(email: string): Promise<Array<IList> | null> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        return user.lists.filter((list) => !list.deleted);
      }
      return null;
    } catch (err: any) {
      console.log(err);
      return null;
    }
  }

  public static async GetListById(email: string, listId: string): Promise<IList | null> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const list = user.lists.id(listId);
        if (list && !list.deleted) return list;
      }
      return null;
    } catch (err: any) {
      console.log(err);
      return null;
    }
  }

  public static async CreateList(email: string, list: IList): Promise<IServiceResponse> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        // Create list
        list.createdBy = list.createdBy;
        list.createdDate = new Date();
        list.deleted = false;
        user.lists.push(list);
        await user.save();

        return { succeeded: true, message: "" };
      }
      return { succeeded: false, message: "User does not exist" };
    } catch (err: any) {
      console.log(err);
      return { succeeded: false, message: err.toString() };
    }
  }

  public static async UpdateList(email: string, list: IList): Promise<IServiceResponse> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const existingList = user.lists.id(list._id);
        if (existingList) {
          existingList.updatedBy = list.updatedBy;
          existingList.updatedDate = new Date();
          existingList.title = list.title;
          existingList.todos = list.todos;
          await user.save();

          return { succeeded: true, message: "" };
        }
      }
      return { succeeded: false, message: "User does not exist" };
    } catch (err: any) {
      console.log(err);
      return { succeeded: false, message: err.toString() };
    }
  }

  public static async DeleteList(email: string, listId: string): Promise<IServiceResponse> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const existingList = user.lists.id(listId);
        if (existingList) {
          existingList.updatedBy = email;
          existingList.updatedDate = new Date();
          existingList.deleted = true;
          await user.save();

          return { succeeded: true, message: "" };
        }
      }
      return { succeeded: false, message: "User does not exist" };
    } catch (err: any) {
      console.log(err);
      return { succeeded: false, message: err.toString() };
    }
  }
}
