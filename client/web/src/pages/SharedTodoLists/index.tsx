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
import TodoListsService from "../../services/TodoLists/todolists.service";
import SharedService from "../../services/Shared/shared.service";
import ListDialog from "../../components/TodoListDialog";
import ShareDialog from "../../components/ShareDialog";
import ConfirmationDialog from "../../components/ConfirmationDialog";

export default function SharedTodoLists({ ...props }: ISharedProps): JSX.Element {
  const email: string = localStorage.getItem("email") as string;
  const navigate = useNavigate();

  const [lists, setLists] = useState<IList[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [dialogData, setDialogData] = useState<IList>();
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
    setDialogData(selectedItem as IList);
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

  const handleConfirmDelete = async (id: number) => {};

  const handleSave = async () => {
    let data: IList = { ...(dialogData as IList) };
    data.updatedBy = email;
    data.updatedDate = new Date(dayjs().format());

    let response = await TodoListsService.UpdateList(data.createdBy, data);
    if (response.status === 204) {
      setDialogOpen(false);
      SharedService.GetSharedLists(email).then((data) => setLists(data));
    }
  };

  useEffect(() => {
    SharedService.GetSharedLists(email).then((data) => setLists(data));
  }, []);

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
        dialogTitle="Delete shared list?"
        dialogContent={
          <React.Fragment>
            <Typography>
              Are you sure you want to delete the shared <b>{selectedItem?.title}</b> list?
            </Typography>
          </React.Fragment>
        }
        dialogCancel="Cancel"
        dialogConfirm="Delete"
      />
    </Grid>
  );
}

interface ISharedProps {}
