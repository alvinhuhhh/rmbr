import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Button,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  MoreVert as OptionsIcon,
  Share as SharedIcon,
  Edit as EditIcon,
  Share as ShareIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { IList } from "../../types/lists.types";
import TodoListsService from "../../services/TodoLists/todolists.service";
import ListDialog from "../../components/TodoListDialog";
import ShareDialog from "../../components/ShareDialog";
import ConfirmationDialog from "../../components/ConfirmationDialog";

export default function TodoLists({ ...props }: ITodoListsProps): JSX.Element {
  const email: string = localStorage.getItem("email") as string;
  const navigate = useNavigate();

  const [lists, setLists] = useState<IList[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false);
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

  const handleShareClick = () => {
    setOptionsAnchor(null);
    setDialogData(selectedItem as IList);
    setShareDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setOptionsAnchor(null);
    setDeleteDialogOpen(true);
  };

  const handleListClick = (event: React.MouseEvent<HTMLElement>, list: IList) => {
    navigate(`/app/lists/${list._id}`);
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
    let response = await TodoListsService.DeleteList(email, id);
    if (response.status === 204) {
      setDeleteDialogOpen(false);
      setSelectedItem(undefined);
    }
  };

  const handleSave = async () => {
    let data: IList = { ...(dialogData as IList) };
    let response;
    switch (dialogType) {
      case "create":
        data.createdBy = email;
        data.createdDate = new Date(dayjs().format());

        response = await TodoListsService.CreateList(email, data);
        if (response.status === 201) {
          setDialogOpen(false);
        }
        break;
      case "edit":
        data.updatedBy = email;
        data.updatedDate = new Date(dayjs().format());

        response = await TodoListsService.UpdateList(email, data);
        if (response.status === 204) {
          setDialogOpen(false);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    TodoListsService.GetLists(email).then((data) => setLists(data));
  }, []);

  useEffect(() => {
    TodoListsService.GetLists(email).then((data) => setLists(data));
  }, [dialogOpen, shareDialogOpen, deleteDialogOpen]);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} xl={6}>
        <Box sx={{ margin: 2, marginBottom: 1 }}>
          <Typography variant="h5" fontWeight="bold" display="inline">
            Lists
          </Typography>
          <Button variant="outlined" size="small" onClick={handleAddClick} sx={{ float: "right" }}>
            <AddIcon />
          </Button>
        </Box>
        <List sx={{ maxHeight: "calc(100vh - 132px)", overflow: "auto" }}>
          {lists.length > 0 &&
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
                <ListItemButton onClick={(event) => handleListClick(event, list)}>
                  <ListItemText primary={list.title} />
                  {list.sharingId ? <SharedIcon fontSize="small" /> : null}
                </ListItemButton>
              </ListItem>
            ))}
          <ListItem disableGutters>
            <ListItemButton onClick={handleAddClick}>
              <ListItemText
                primary="+ New list"
                primaryTypographyProps={{ fontWeight: "bold" }}
                secondary="Click to create a new list"
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
              <ListItemButton id="editItem" onClick={handleShareClick}>
                <ListItemIcon>
                  <ShareIcon />
                </ListItemIcon>
                Share
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
      <ListDialog
        title={dialogTitle}
        open={dialogOpen}
        setOpen={setDialogOpen}
        data={dialogData}
        setData={setDialogData}
        save={handleSave}
      />
      <ShareDialog
        title="Sharing"
        open={shareDialogOpen}
        setOpen={setShareDialogOpen}
        data={dialogData}
        setData={setDialogData}
      />
      <ConfirmationDialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={() => handleConfirmDelete(selectedItem?._id || -1)}
        dialogTitle={selectedItem?.sharingId ? "Delete shared list?" : "Delete list?"}
        dialogContent={
          selectedItem?.sharingId ? (
            <Typography>
              Are you sure you want to delete the shared <b>{selectedItem?.title}</b> list? Shared users will lose
              access to this list.
            </Typography>
          ) : (
            <Typography>
              Are you sure you want to delete <b>{selectedItem?.title}</b>?
            </Typography>
          )
        }
        dialogCancel="Cancel"
        dialogConfirm="Delete"
      />
    </Grid>
  );
}

interface ITodoListsProps {}
