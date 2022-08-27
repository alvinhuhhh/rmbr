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
  Edit as EditIcon,
  Share as ShareIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { IList } from "../../types/lists.types";
import TodoListsService from "../../services/TodoLists/todolists.service";
import SharedService from "../../services/Shared/shared.service";
import ConfirmationDialog from "../../components/ConfirmationDialog";

export default function Shared({ ...props }: ISharedProps): JSX.Element {
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

  useEffect(() => {
    SharedService.GetSharedLists().then((data) => setLists(data));
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} xl={6}>
        <Box sx={{ margin: 2, marginBottom: 1 }}>
          <Typography variant="h5" fontWeight="bold" display="inline">
            Lists
          </Typography>
        </Box>
        <List sx={{ maxHeight: "calc(100vh - 132px)", overflow: "auto" }}>
          {lists.length > 0 &&
            lists.map((list) => (
              <ListItem
                key={list._id}
                secondaryAction={
                  <IconButton edge="end">
                    <OptionsIcon />
                  </IconButton>
                }
                disablePadding
                divider
              >
                <ListItemButton id={list._id?.toString()}>
                  <ListItemText primary={list.title} />
                </ListItemButton>
              </ListItem>
            ))}
          <ListItem disableGutters>
            <ListItemButton>
              <ListItemText
                primary="+ New list"
                primaryTypographyProps={{ fontWeight: "bold" }}
                secondary="Click to create a new list"
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}

interface ISharedProps {}
