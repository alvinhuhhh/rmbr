import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Checkbox,
  IconButton,
  Fab,
  Popover,
  Typography,
} from "@mui/material";
import { Add as AddIcon, MoreVert as OptionsIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { IList } from "../../types/lists.types";
import { ITodo } from "../../types/todo.types";
import TodoListsService from "../../services/TodoLists/todolists.service";
import TodoService from "../../services/Todo/todo.service";
import TodoDialog from "./dialog";
import DeleteDialog from "../../components/DeleteDialog";

export default function TodoList({ ...props }: TodoListProps): JSX.Element {
  const { listId } = useParams();

  const [list, setList] = useState<IList>();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [dialogData, setDialogData] = useState<ITodo>();
  const [dialogType, setDialogType] = useState<string>("");
  const [optionsAnchor, setOptionsAnchor] = useState<HTMLButtonElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<ITodo>();

  const handleAddClick = () => {
    setDialogTitle("New todo");
    setDialogData({} as ITodo);
    setDialogType("create");
    setDialogOpen(true);
  };

  const handleEditClick = (event: React.MouseEvent<HTMLElement>, todo?: ITodo) => {
    setOptionsAnchor(null);
    setDialogTitle("Edit todo");
    setDialogData((todo && (todo as ITodo)) || (selectedItem as ITodo));
    setDialogType("edit");
    setDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setOptionsAnchor(null);
    setDeleteDialogOpen(true);
  };

  const handleOptionsClick = (event: React.MouseEvent<HTMLButtonElement>, todo: ITodo) => {
    setOptionsAnchor(event.currentTarget);
    setSelectedItem(todo);
  };

  const handleOptionsClose = () => {
    setOptionsAnchor(null);
    setSelectedItem(undefined);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedItem(undefined);
  };

  const handleToggleDone = async (event: React.MouseEvent<HTMLElement>, todo: ITodo) => {
    event.stopPropagation();

    let data: ITodo = { ...todo };
    data.done = !data.done;
    let status = await TodoService.UpdateTodo(listId as string, data);
    if (status === 204) {
      TodoService.GetTodos(listId as string).then((data) => setTodos(data));
    }
  };

  const handleConfirmDelete = async (id: number) => {
    let status = await TodoService.DeleteTodo(listId as string, id);
    if (status === 204) {
      setDeleteDialogOpen(false);
      setSelectedItem(undefined);
      TodoService.GetTodos(listId as string).then((data) => setTodos(data));
    }
  };

  const handleSave = async () => {
    let data: ITodo = { ...(dialogData as ITodo) };
    let status: number | undefined;
    switch (dialogType) {
      case "create":
        data.createdBy = sessionStorage.getItem("email") || "";
        data.createdDate = new Date(dayjs().format());
        data.done = false;

        status = await TodoService.CreateTodo(listId as string, data);
        if (status === 201) {
          setDialogOpen(false);
          TodoService.GetTodos(listId as string).then((data) => setTodos(data));
        }
        break;
      case "edit":
        data.updatedBy = sessionStorage.getItem("email") || "";
        data.updatedDate = new Date(dayjs().format());

        status = await TodoService.UpdateTodo(listId as string, data);
        if (status === 204) {
          setDialogOpen(false);
          TodoService.GetTodos(listId as string).then((data) => setTodos(data));
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    TodoListsService.GetListById(listId as string).then((data) => setList(data));
    TodoService.GetTodos(listId as string).then((data) => setTodos(data));
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} xl={6} sx={{ maxHeight: "calc(100vh - 64px)", overflow: "auto", paddingBottom: 15 }}>
        <Typography variant="h5" sx={{ margin: 2, marginBottom: 1 }}>
          <b>{list && list.title}</b>
        </Typography>
        <List>
          {todos.length > 0 ? (
            todos.map((todo) => (
              <ListItem
                key={todo._id}
                secondaryAction={
                  <IconButton edge="end" onClick={(event) => handleOptionsClick(event, todo)}>
                    <OptionsIcon />
                  </IconButton>
                }
                disablePadding
                divider
              >
                <ListItemIcon>
                  <Checkbox checked={todo.done} onClick={(event) => handleToggleDone(event, todo)} />
                </ListItemIcon>
                <ListItemButton onClick={(event) => handleEditClick(event, todo)} disableGutters>
                  <ListItemText primary={todo.title} />
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <ListItem>No todos found. Create one!</ListItem>
          )}
        </List>
        <Popover
          id="optionsPopover"
          open={Boolean(optionsAnchor)}
          anchorEl={optionsAnchor}
          onClose={handleOptionsClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton id="editItem" onClick={handleEditClick}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                Edit
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton id="deleteItem" onClick={handleDeleteClick}>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                Delete
              </ListItemButton>
            </ListItem>
          </List>
        </Popover>
      </Grid>
      <Fab size="large" color="secondary" sx={{ position: "absolute", bottom: 15, right: 15 }} onClick={handleAddClick}>
        <AddIcon />
      </Fab>
      <TodoDialog
        title={dialogTitle}
        open={dialogOpen}
        setOpen={setDialogOpen}
        data={dialogData}
        setData={setDialogData}
        save={handleSave}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={() => handleConfirmDelete(selectedItem?._id || -1)}
        itemType="todo"
        itemName={selectedItem?.title || ""}
      />
    </Grid>
  );
}

interface TodoListProps {}
