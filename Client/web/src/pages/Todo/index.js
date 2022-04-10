import React, { useState, useContext, useEffect } from "react";

import {
  Button,
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

import TodoModel from "../../models/Todo";
import {
  createTodo,
  getTodoList,
  updateTodo,
  deleteTodo,
} from "../../services/Todo";

import TodoDialog from "../../pages/Todo/dialog";

export default function Todo({ ...props }) {
  // state
  const [todoList, setTodoList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogData, setDialogData] = useState();
  const [dialogType, setDialogType] = useState();

  // methods
  const openNewDialog = () => {
    setDialogTitle("New");
    setDialogData(new TodoModel({}));
    setDialogType("create");
    setDialogOpen(true);
  };

  const openEditDialog = (todo) => {
    setDialogTitle("Edit");
    setDialogData(todo);
    setDialogType("edit");
    setDialogOpen(true);
  };

  const handleSave = async () => {
    switch (dialogType) {
      case "create":
        createTodo(dialogData)
          .then(() => {
            setDialogOpen(false);
          })
          .then(() => {
            return getTodoList();
          })
          .then((result) => {
            setTodoList(result);
          });
        break;

      case "edit":
        updateTodo(dialogData)
          .then(() => {
            setDialogOpen(false);
          })
          .then(() => {
            return getTodoList();
          })
          .then((result) => {
            setTodoList(result);
          });
        break;

      default:
        break;
    }
  };

  const handleCheckboxToggle = async (todo) => {
    todo.done = !todo.done;
    updateTodo(todo)
      .then(() => {
        return getTodoList();
      })
      .then((result) => {
        setTodoList(result);
      });
  };

  const handleDeleteTodo = async (todo) => {
    deleteTodo(todo)
      .then(() => {
        return getTodoList();
      })
      .then((result) => {
        setTodoList(result);
      });
  };

  // useEffect
  useEffect(() => {
    getTodoList().then((result) => {
      setTodoList(result);
    });
  }, []);

  return (
    <Grid container justifyContent="center" alignItems="center">
      <List sx={{ height: 600, width: 400 }}>
        {todoList.map((todo) => (
          <ListItem
            key={todo._id}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleDeleteTodo(todo)}>
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
            divider
          >
            <ListItemIcon>
              <Checkbox
                checked={todo.done}
                onChange={() => handleCheckboxToggle(todo)}
              />
            </ListItemIcon>
            <ListItemButton onClick={() => openEditDialog(todo)}>
              <ListItemText primary={todo.title} />
            </ListItemButton>
          </ListItem>
        ))}
        <Button startIcon={<AddIcon />} onClick={openNewDialog} fullWidth>
          New Todo
        </Button>
      </List>
      <TodoDialog
        title={dialogTitle}
        open={dialogOpen}
        setOpen={setDialogOpen}
        data={dialogData}
        setData={setDialogData}
        save={handleSave}
      />
    </Grid>
  );
}
