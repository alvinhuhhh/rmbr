import User from "../models/user";
import { IList } from "../types/list.types";

export default class TrashService {
  public static async GetTrash(email: string): Promise<Array<IList> | undefined> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        return user.lists.filter((list) => list.deleted);
      }
    } catch (err) {
      console.log(err);
    }
  }

  public static async RestoreItem(email: string, listId: string): Promise<boolean> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const existingList = user.lists.id(listId);
        if (existingList) {
          existingList.updatedBy = email;
          existingList.updatedDate = new Date();
          existingList.deleted = false;
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

  public static async DeleteItem(email: string, listId: string): Promise<boolean> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
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

  public static async DeleteAll(email: string): Promise<boolean> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const deletedLists = user.lists.filter((list) => list.deleted);
        deletedLists.forEach((list) => {
          user.lists.pull(list._id);
        });
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
