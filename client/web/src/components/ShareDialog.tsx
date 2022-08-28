import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import { Close as CloseIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { IList } from "../types/lists.types";
import TodoListsService from "../services/TodoLists/todolists.service";
import SharedService from "../services/Shared/shared.service";

export default function ShareDialog({ title, open, setOpen, data, setData, ...props }: IShareDialogProps): JSX.Element {
  const email: string = localStorage.getItem("email") as string;

  const [userEmail, setUserEmail] = useState<string>("");
  const [serverValidation, setServerValidation] = useState<string>("");

  const onClose = () => {
    setUserEmail("");
    setOpen(false);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined = (event) => {
    const { value } = event.target;
    setUserEmail(value);
  };

  const handleRemoveClick = async (event: React.MouseEvent<HTMLButtonElement>, targetUserEmail: string) => {
    try {
      let response = await SharedService.RemoveShare(email, targetUserEmail, data as IList);
      if (response?.status === 204) {
        TodoListsService.GetListById(email, data?._id?.toString() as string).then((data) => setData(data));
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleShareClick = async () => {
    try {
      let response = await SharedService.CreateShare(email, userEmail, data as IList);
      if (response?.status === 201) {
        TodoListsService.GetListById(email, data?._id?.toString() as string).then((data) => setData(data));
        setUserEmail("");
      } else {
        setServerValidation(response.data);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" display="inline">
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="body1" fontWeight="bold">
              Owner
            </Typography>
            <List disablePadding>
              <ListItem disablePadding>
                <ListItemText primary={data?.createdBy} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" fontWeight="bold">
              Shared with
            </Typography>
            <List disablePadding>
              {data?.sharedUsers && data.sharedUsers.length > 0 ? (
                data.sharedUsers.map((u) => (
                  <ListItem key={u.email} disablePadding>
                    <ListItemText primary={u.email}></ListItemText>
                    <Button size="small" onClick={(event) => handleRemoveClick(event, u.email)}>
                      Remove
                    </Button>
                  </ListItem>
                ))
              ) : (
                <ListItem key={-1} disablePadding>
                  <ListItemText primary="No users" />
                </ListItem>
              )}
            </List>
          </Grid>
          <Grid item xs={12} container justifyContent="center" alignItems="top" spacing={1}>
            <Grid item xs={12}>
              <Typography variant="body1" fontWeight="bold">
                Share with
              </Typography>
            </Grid>
            <Grid item sx={{ flexGrow: 1 }}>
              <TextField
                name="userEmail"
                value={userEmail || ""}
                onChange={handleInputChange}
                variant="filled"
                size="small"
                hiddenLabel
                fullWidth
                {...(serverValidation && { error: true, helperText: serverValidation })}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleShareClick} disabled={!userEmail}>
                Share
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions />
    </Dialog>
  );
}

interface IShareDialogProps {
  title: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: IList | undefined;
  setData: React.Dispatch<React.SetStateAction<IList | undefined>>;
}
