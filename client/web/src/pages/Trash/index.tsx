import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
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
  Button,
} from "@mui/material";
import { MoreVert as OptionsIcon, Restore as RestoreIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { IList } from "../../types/lists.types";
import { ITodo } from "../../types/todo.types";
import TrashService from "../../services/Trash/trash.service";
import DeleteDialog from "../../components/DeleteDialog";

export default function Trash({ ...props }: ITrashProps): JSX.Element {
  const [trashed, setTrashed] = useState<Array<IList | ITodo>>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [optionsAnchor, setOptionsAnchor] = useState<HTMLButtonElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<IList | ITodo>();

  const handleOptionsClick = (event: React.MouseEvent<HTMLButtonElement>, item: IList | ITodo) => {
    setOptionsAnchor(event.currentTarget);
    setSelectedItem(item);
  };

  const handleOptionsClose = () => {
    setOptionsAnchor(null);
    setSelectedItem(undefined);
  };

  const handleRestoreClick = async () => {};

  const handleDeleteClick = () => {
    setOptionsAnchor(null);
    setDeleteDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedItem(undefined);
  };

  const handleConfirmDelete = async (id: number) => {};

  const handleEmptyClick = async () => {};

  useEffect(() => {
    TrashService.GetTrash().then((data) =>
      setTrashed(data.sort((a, b) => (dayjs(a.updatedDate).isBefore(b.updatedDate) ? 1 : -1)))
    );
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} xl={6}>
        <Grid container justifyContent="space-between" alignItems="center" spacing={1} sx={{ padding: 2 }}>
          <Grid item>
            <Box>
              <Typography variant="h5" fontWeight="bold" display="block">
                Trash
              </Typography>
              <Typography variant="subtitle2" display="block">
                Items in trash will be deleted after 30 days.
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Button variant="outlined" size="small" onClick={handleEmptyClick} sx={{ float: "right" }}>
              <DeleteIcon />
            </Button>
          </Grid>
        </Grid>
        <List sx={{ maxHeight: "calc(100vh - 132px)", overflow: "auto" }}>
          {trashed.length > 0 ? (
            trashed.map((item) => (
              <ListItem
                key={item._id}
                secondaryAction={
                  <IconButton edge="end" onClick={(event) => handleOptionsClick(event, item)}>
                    <OptionsIcon />
                  </IconButton>
                }
                divider
              >
                <ListItemText
                  primary={item.title}
                  secondary={`Deleted on ${dayjs(item.updatedDate).format("DD/MM/YYYY")}`}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText>Nothing here!</ListItemText>
            </ListItem>
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
              <ListItemButton id="restoreItem" onClick={handleRestoreClick}>
                <ListItemIcon>
                  <RestoreIcon />
                </ListItemIcon>
                Restore
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
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={() => handleConfirmDelete(selectedItem?._id || -1)}
        itemType="permanently"
        itemName={selectedItem?.title || ""}
      />
    </Grid>
  );
}

interface ITrashProps {}
