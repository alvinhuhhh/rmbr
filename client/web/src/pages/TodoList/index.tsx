import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import {
  Grid,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Button,
  Checkbox,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  MoreVert as OptionsIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Bookmark as PriorityIcon,
} from "@mui/icons-material";
import { IList } from "../../types/lists.types";
import { ITodo } from "../../types/todo.types";
import TodoListsService from "../../services/TodoLists/todolists.service";
import TodoService from "../../services/Todo/todo.service";
import TodoDialog from "../../components/TodoDialog";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import PriorityColorMap from "../../components/PriorityColorMap";

export default function TodoList({ ...props }: TodoListProps): JSX.Element {
  const email: string = localStorage.getItem("email") as string;
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
    data.updatedBy = email;
    data.updatedDate = new Date(dayjs().format());
    data.done = !data.done;

    let response = await TodoService.UpdateTodo(email, listId as string, data);
    if (response.status === 204) {
      TodoService.GetTodos(email, listId as string).then((data) => setTodos(data));
    }
  };

  const handleConfirmDelete = async (id: number) => {
    let response = await TodoService.DeleteTodo(email, listId as string, id);
    if (response.status === 204) {
      setDeleteDialogOpen(false);
      setSelectedItem(undefined);
    }
  };

  const handleSave = async () => {
    let data: ITodo = { ...(dialogData as ITodo) };
    let response;
    switch (dialogType) {
      case "create":
        data.createdBy = email;
        data.createdDate = new Date(dayjs().format());
        data.done = false;
        data.priority = data.priority || -1;

        response = await TodoService.CreateTodo(email, listId as string, data);
        if (response.status === 201) {
          setDialogOpen(false);
        }
        break;
      case "edit":
        data.updatedBy = email;
        data.updatedDate = new Date(dayjs().format());

        response = await TodoService.UpdateTodo(email, listId as string, data);
        if (response.status === 204) {
          setDialogOpen(false);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    TodoListsService.GetListById(email, listId as string).then((data) => setList(data));
    TodoService.GetTodos(email, listId as string).then((data) => setTodos(data));
  }, []);

  useEffect(() => {
    TodoListsService.GetListById(email, listId as string).then((data) => setList(data));
    TodoService.GetTodos(email, listId as string).then((data) => setTodos(data));
  }, [dialogOpen, deleteDialogOpen]);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} xl={6} sx={{ maxHeight: "calc(100vh - 64px)", overflow: "auto" }}>
        <Box sx={{ margin: 2, marginBottom: 1 }}>
          <Typography variant="h5" fontWeight="bold" display="inline">
            {list && list.title}
          </Typography>
          <Button variant="outlined" size="small" onClick={handleAddClick} sx={{ float: "right" }}>
            <AddIcon />
          </Button>
        </Box>
        <List>
          {todos.length > 0 &&
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
                <ListItemButton onClick={(event) => handleEditClick(event, todo)}>
                  <ListItemIcon>
                    <Checkbox checked={todo.done} onClick={(event) => handleToggleDone(event, todo)} />
                  </ListItemIcon>
                  <ListItemText
                    primary={todo.title}
                    primaryTypographyProps={
                      (todo.done && { sx: { textDecorationLine: "line-through", color: "#999999" } }) || {}
                    }
                    secondary={todo.notes}
                  />
                  {todo.priority && todo.priority > 0 && (
                    <PriorityIcon color={PriorityColorMap[todo.priority]} fontSize="small" />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          <ListItem disableGutters>
            <ListItemButton onClick={handleAddClick}>
              <ListItemText
                primary="+ New todo"
                primaryTypographyProps={{ fontWeight: "bold" }}
                secondary="Click to create a new todo"
              />
            </ListItemButton>
          </ListItem>
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
      <TodoDialog
        title={dialogTitle}
        open={dialogOpen}
        setOpen={setDialogOpen}
        data={dialogData}
        setData={setDialogData}
        save={handleSave}
      />
      <ConfirmationDialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={() => handleConfirmDelete(selectedItem?._id || -1)}
        dialogTitle="Delete todo?"
        dialogContent={
          <Typography>
            Are you sure you want to delete <b>{selectedItem?.title}</b>?
          </Typography>
        }
        dialogCancel="Cancel"
        dialogConfirm="Delete"
      />
    </Grid>
  );
}

interface TodoListProps {}
