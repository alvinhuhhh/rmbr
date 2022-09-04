import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
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
  Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { ISharing } from "../types/sharing.types";
import SharingService from "../services/Sharing/sharing.service";

export default function ShareDialog({ title, open, setOpen, sharingId, ...props }: IShareDialogProps): JSX.Element {
  const email: string = localStorage.getItem("email") as string;

  const [share, setShare] = useState<ISharing | undefined>(undefined);
  const [userEmail, setUserEmail] = useState<string>("");
  const [serverValidation, setServerValidation] = useState<string>("");

  const onClose = () => {
    setUserEmail("");
    setServerValidation("");
    setOpen(false);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined = (event) => {
    const { value } = event.target;
    setUserEmail(value);
  };

  const handleRemoveClick = async (event: React.MouseEvent<HTMLButtonElement>, targetUserEmail: string) => {
    try {
      let data: ISharing = { ...(share as ISharing) };
      data.updatedDate = new Date(dayjs().format());
      data.users.filter((user) => user.email !== userEmail);

      let response = await SharingService.UpdateShare(sharingId as number, data);
      if (response?.status === 204) {
        typeof sharingId === "number" && SharingService.GetShareById(sharingId).then((data) => setShare(data));
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleShareClick = async () => {
    try {
      let data: ISharing = { ...(share as ISharing) };
      data.updatedDate = new Date(dayjs().format());
      data.users.push({ email: userEmail });

      let response = await SharingService.UpdateShare(sharingId as number, data);
      if (response?.status === 201) {
        typeof sharingId === "number" && SharingService.GetShareById(sharingId).then((data) => setShare(data));
        setUserEmail("");
        setServerValidation("");
      } else {
        setServerValidation(response.data);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    typeof sharingId === "number" && SharingService.GetShareById(sharingId).then((data) => setShare(data));
  }, [sharingId]);

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
                <ListItemText primary={share?.owner} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" fontWeight="bold">
              Shared with
            </Typography>
            <List disablePadding>
              {share?.users && share.users.length > 0 ? (
                share.users.map((u) => (
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
  sharingId: number | undefined;
}
