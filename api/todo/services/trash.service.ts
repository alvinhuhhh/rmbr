import User from "../models/user";
import { IList } from "../types/list.types";
import { ITodo } from "../types/todo.types";

export default class TrashService {
  public static async GetTrash(email: string): Promise<Array<IList | ITodo> | undefined> {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        let result: Array<IList | ITodo> = [];

        // Get deleted lists
        let deletedLists: Array<IList> = user.lists.filter((list) => list.deleted);
        deletedLists.map((list) => result.push(list));

        // Get deleted todos
        let deletedTodos: Array<ITodo> = [];
        let lists: Array<IList> = user.lists.filter((list) => !list.deleted);
        lists.map((list) => {
          list.todos.map((todo) => {
            if (todo.deleted) deletedTodos.push(todo);
          });
        });
        deletedTodos.map((todo) => result.push(todo));

        return result;
      }
    } catch (err) {
      console.log(err);
    }
  }
}
