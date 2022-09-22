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
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import {
  MoreVert as OptionsIcon,
  Edit as EditIcon,
  Share as ShareIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { IList } from "../../types/lists.types";
import { ISharing } from "../../types/sharing.types";
import TodoListsService from "../../services/TodoLists/todolists.service";
import SharingService from "../../services/Sharing/sharing.service";
import ListDialog from "../../components/TodoListDialog";
import ShareDialog from "../../components/ShareDialog";
import ConfirmationDialog from "../../components/ConfirmationDialog";

export default function SharedTodoLists({ ...props }: ISharedProps): JSX.Element {
  const loggedInUser: string = localStorage.getItem("email") as string;
  const navigate = useNavigate();

  const [lists, setLists] = useState<IList[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [dialogData, setDialogData] = useState<IList>();
  const [shareDialogData, setShareDialogData] = useState<ISharing>();
  const [optionsAnchor, setOptionsAnchor] = useState<HTMLButtonElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<IList>();

  const handleEditClick = () => {
    setOptionsAnchor(null);
    setDialogTitle("Edit list");
    setDialogData(selectedItem as IList);
    setDialogOpen(true);
  };

  const handleShareClick = () => {
    setOptionsAnchor(null);
    selectedItem?.sharingId &&
      SharingService.GetShareById(selectedItem.sharingId).then((data) => {
        setShareDialogData(data);
      });
    setShareDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setOptionsAnchor(null);
    setDeleteDialogOpen(true);
  };

  const handleListClick = (event: React.MouseEvent<HTMLElement>, list: IList) => {
    navigate(`/app/shared/lists/${list.createdBy}/${list._id}`);
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
    try {
      let response;
      if (selectedItem?.createdBy === loggedInUser) response = await TodoListsService.DeleteList(loggedInUser, id);
      else {
        const existingShare = await SharingService.GetShareById(selectedItem?.sharingId as number);
        if (existingShare) {
          existingShare.updatedDate = new Date();
          existingShare.users.filter((user) => user.email !== loggedInUser);

          // SharingService.UpdateShare(existingShare._id as number, existingShare);
        }
      }

      if (response?.status === 204) {
        setDeleteDialogOpen(false);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    let data: IList = { ...(dialogData as IList) };
    data.updatedBy = loggedInUser;
    data.updatedDate = new Date(dayjs().format());

    let response = await TodoListsService.UpdateList(data.createdBy, data);
    if (response.status === 204) {
      setDialogOpen(false);
    }
  };

  useEffect(() => {
    SharingService.GetSharedLists(loggedInUser).then((data) => setLists(data));
  }, []);

  useEffect(() => {
    SharingService.GetSharedLists(loggedInUser).then((data) => setLists(data));
  }, [dialogOpen, shareDialogOpen, deleteDialogOpen]);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} xl={6}>
        <Box sx={{ margin: 2, marginBottom: 1 }}>
          <Typography variant="h5" fontWeight="bold" display="inline">
            Shared
          </Typography>
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
                  <ListItemText primary={list.title} secondary={`${list.createdBy}`} />
                </ListItemButton>
              </ListItem>
            ))}
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
            {selectedItem?.createdBy === loggedInUser && (
              <ListItem disablePadding>
                <ListItemButton id="editItem" onClick={handleShareClick}>
                  <ListItemIcon>
                    <ShareIcon />
                  </ListItemIcon>
                  Share
                </ListItemButton>
              </ListItem>
            )}
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
        data={shareDialogData}
        setData={setShareDialogData}
      />
      <ConfirmationDialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={() => handleConfirmDelete(selectedItem?._id || -1)}
        dialogTitle="Delete shared list?"
        dialogContent={
          selectedItem?.createdBy === loggedInUser ? (
            <Typography>
              Are you sure you want to delete the shared <b>{selectedItem?.title}</b> list? Shared users will lose
              access to this list.
            </Typography>
          ) : (
            <Typography>
              Are you sure you want to leave the shared <b>{selectedItem?.title}</b> list?
            </Typography>
          )
        }
        dialogCancel="Cancel"
        dialogConfirm="Delete"
      />
    </Grid>
  );
}

interface ISharedProps {}
