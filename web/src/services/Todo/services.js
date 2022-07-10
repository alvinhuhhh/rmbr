import axios from "axios";
import dayjs from "dayjs";
import appConfig from "../../config";

async function createTodo(todo) {
  try {
    const dto = { ...todo };
    dto.createdBy = appConfig.user.username;
    dto.createdDate = dayjs().format();

    let response = await axios.post(`${appConfig.api.url}/create`, dto);
    console.log(`[createTodo] Status code: ${response.status}`);

    return true;
  } catch (error) {
    console.log(error);
  }
}

async function getTodoList() {
  try {
    let response = await axios.get(`${appConfig.api.url}/list`);
    console.log(`[getTodoList] Status code: ${response.status}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function updateTodo(todo) {
  try {
    const dto = { ...todo };
    dto.updatedBy = appConfig.user.username;
    dto.updatedDate = dayjs().format();

    let response = await axios.put(`${appConfig.api.url}/${todo._id}/update`, dto);
    console.log(`[updateTodo] Status code: ${response.status}`);

    return true;
  } catch (error) {
    console.log(error);
  }
}

async function deleteTodo(todo) {
  try {
    let response = await axios.delete(`${appConfig.api.url}/${todo._id}/delete`);
    console.log(`[deleteTodo] Status code: ${response.status}`);

    return true;
  } catch (error) {
    console.log(error);
  }
}

export { createTodo, getTodoList, updateTodo, deleteTodo };
