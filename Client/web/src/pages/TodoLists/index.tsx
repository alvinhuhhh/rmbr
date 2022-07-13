import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Fab,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { IList } from "../../types/lists.types";
import TodoListsService from "../../services/TodoLists/todolists.service";
import ListDialog from "./dialog";

export default function TodoLists({ ...props }: ITodoListsProps) {
  const [lists, setLists] = useState<IList[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [dialogData, setDialogData] = useState<IList>();
  const [dialogType, setDialogType] = useState<string>("");
  const [confirmationDialogData, setConfirmationDialogData] = useState<IList>();

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

  const handleDeleteClick = (list: IList) => {
    setConfirmationDialogData(list);
  };

  const handleCancelDelete = () => {
    setConfirmationDialogData(undefined);
  };

  const handleConfirmDelete = async (id: number) => {
    let status = await TodoListsService.DeleteList(id);
    if (status === 204) {
      setConfirmationDialogData(undefined);
      TodoListsService.GetLists().then((data) => setLists(data));
    }
  };

  const handleSave = async () => {
    switch (dialogType) {
      case "create":
        const data: IList = { ...(dialogData as IList) };
        data.createdBy = sessionStorage.getItem("email") || "";
        data.createdDate = new Date(dayjs().format());

        let status = await TodoListsService.CreateList(data);
        if (status === 201) {
          setDialogOpen(false);
          TodoListsService.GetLists().then((data) => setLists(data));
        }
        break;
      case "edit":
        break;
    }
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
                <ListItemButton>{list.title}</ListItemButton>
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
      <Dialog open={Boolean(confirmationDialogData)} onClose={handleCancelDelete}>
        <DialogContent>Are you sure you want to delete {confirmationDialogData?.title || ""}?</DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => handleConfirmDelete(confirmationDialogData?._id || -1)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

interface ITodoListsProps {}
