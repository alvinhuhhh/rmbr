import React, { useState, useEffect } from "react";
import { Grid, List, ListItem, ListItemButton, IconButton, Fab } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import dayjs from "dayjs";
import TodoListsService from "../../services/TodoLists/todolists.service";
import ListDialog from "./dialog";

export default function TodoLists({ ...props }: ITodoListsProps) {
  const [lists, setLists] = useState<IList[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [dialogData, setDialogData] = useState<IList>();
  const [dialogType, setDialogType] = useState<string>("");

  const handleAddClick = () => {
    setDialogTitle("New list");
    setDialogData({} as IList);
    setDialogType("create");
    setDialogOpen(true);
  };

  const handleEditClick = () => {
    setDialogTitle("Edit list");
    setDialogData({} as IList);
    setDialogType("edit");
    setDialogOpen(true);
  };

  const handleDeleteClick = (list: IList) => {};

  const handleSave = () => {
    const data: IList = { ...(dialogData as IList) };
    data.createdBy = sessionStorage.getItem("email") || "";
    data.createdDate = new Date(dayjs().format());

    TodoListsService.CreateList(data)
      .then(() => setDialogOpen(false))
      .then(() => {
        return TodoListsService.GetLists();
      })
      .then((data) => setLists(data));
  };

  useEffect(() => {
    TodoListsService.GetLists().then((data) => setLists(data));
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <List>
          {lists.length > 0 ? (
            lists.map((list, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleDeleteClick(list)}>
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding
                divider
              >
                <ListItemButton onClick={handleEditClick}>{list.title}</ListItemButton>
              </ListItem>
            ))
          ) : (
            <ListItem>No lists found. Create one!</ListItem>
          )}
        </List>
      </Grid>
      <Fab size="large" color="secondary" sx={{ position: "absolute", bottom: 15, right: 15 }} onClick={handleAddClick}>
        <AddIcon />
      </Fab>
      <ListDialog
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

interface ITodoListsProps {}
