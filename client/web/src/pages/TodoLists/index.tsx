import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  IconButton,
  Fab,
  Popover,
} from "@mui/material";
import { Add as AddIcon, MoreVert as OptionsIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { IList } from "../../types/lists.types";
import TodoListsService from "../../services/TodoLists/todolists.service";
import ListDialog from "./dialog";
import DeleteDialog from "../../components/DeleteDialog";

export default function TodoLists({ ...props }: ITodoListsProps): JSX.Element {
  const navigate = useNavigate();

  const [lists, setLists] = useState<IList[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [dialogData, setDialogData] = useState<IList>();
  const [dialogType, setDialogType] = useState<string>("");
  const [optionsAnchor, setOptionsAnchor] = useState<HTMLButtonElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<IList>();

  const handleAddClick = () => {
    setDialogTitle("New list");
    setDialogData({} as IList);
    setDialogType("create");
    setDialogOpen(true);
  };

  const handleEditClick = () => {
    setOptionsAnchor(null);
    setDialogTitle("Edit list");
    setDialogData(selectedItem as IList);
    setDialogType("edit");
    setDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setOptionsAnchor(null);
    setDeleteDialogOpen(true);
  };

  const handleListClick = (event: React.MouseEvent<HTMLElement>) => {
    const { id } = event.currentTarget;
    navigate(`/app/lists/${id}`);
  };

  const handleOptionsClick = (event: React.MouseEvent<HTMLButtonElement>, list: IList) => {
    setOptionsAnchor(event.currentTarget);
    setSelectedItem(list);
  };

  const handleOptionsClose = () => {
    setOptionsAnchor(null);
    setSelectedItem(undefined);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedItem(undefined);
  };

  const handleConfirmDelete = async (id: number) => {
    let status = await TodoListsService.DeleteList(id);
    if (status === 204) {
      setDeleteDialogOpen(false);
      setSelectedItem(undefined);
      TodoListsService.GetLists().then((data) => setLists(data));
    }
  };

  const handleSave = async () => {
    let data: IList = { ...(dialogData as IList) };
    let status: number | undefined;
    switch (dialogType) {
      case "create":
        data.createdBy = sessionStorage.getItem("email") || "";
        data.createdDate = new Date(dayjs().format());

        status = await TodoListsService.CreateList(data);
        if (status === 201) {
          setDialogOpen(false);
          TodoListsService.GetLists().then((data) => setLists(data));
        }
        break;
      case "edit":
        data.updatedBy = sessionStorage.getItem("email") || "";
        data.updatedDate = new Date(dayjs().format());

        status = await TodoListsService.UpdateList(data);
        if (status === 204) {
          setDialogOpen(false);
          TodoListsService.GetLists().then((data) => setLists(data));
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    TodoListsService.GetLists().then((data) => setLists(data));
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} xl={6} sx={{ maxHeight: "calc(100vh - 64px)", overflow: "auto", paddingBottom: 15 }}>
        <List>
          {lists.length > 0 ? (
            lists.map((list) => (
              <ListItem
                key={list._id}
                secondaryAction={
                  <IconButton edge="end" onClick={(event) => handleOptionsClick(event, list)}>
                    <OptionsIcon />
                  </IconButton>
                }
                disablePadding
                divider
              >
                <ListItemButton id={list._id?.toString()} onClick={handleListClick}>
                  <ListItemText primary={list.title} />
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <ListItem>No lists found. Create one!</ListItem>
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
      <ListDialog
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
        itemType="list"
        itemName={selectedItem?.title || ""}
      />
    </Grid>
  );
}

interface ITodoListsProps {}
