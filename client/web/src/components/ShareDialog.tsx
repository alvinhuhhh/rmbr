import React, { useState } from "react";
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

export default function ShareDialog({ title, open, setOpen, data, setData, ...props }: IShareDialogProps): JSX.Element {
  const [userEmail, setUserEmail] = useState<string>("");
  const [serverValidation, setServerValidation] = useState<string>("");

  const onClose = () => {
    setUserEmail("");
    setServerValidation("");
    setData(undefined);
    setOpen(false);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined = (event) => {
    const { value } = event.target;
    setUserEmail(value);
    setServerValidation("");
  };

  const validate = async (): Promise<boolean> => {
    const response = await SharingService.CheckIfUserExists(userEmail);
    if (response.status === 404) {
      setServerValidation("User does not exist. Send an invite?");
      return false;
    }

    if (data?.users.find((user) => user.email === userEmail)) {
      setServerValidation("User has already been added");
      return false;
    }

    if (userEmail === data?.owner) {
      setServerValidation("List cannot be shared with owner");
      return false;
    }

    return true;
  };

  const handleRemoveClick = async (event: React.MouseEvent<HTMLButtonElement>, userEmail: string) => {
    try {
      if (data) {
        let payload = { ...data };
        payload.updatedDate = new Date(dayjs().format());
        payload.users = payload.users.filter((user) => user.email !== userEmail);

        let response = await SharingService.UpdateShare(payload);
        if (response?.status === 204) {
          SharingService.GetShareById(data._id as number).then((response) => setData(response));
          setUserEmail("");
          setServerValidation("");
        } else {
          setServerValidation(response.data);
        }
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleShareClick = async () => {
    try {
      if (data && (await validate())) {
        let payload = { ...data };
        payload.updatedDate = new Date(dayjs().format());
        payload.users.push({ email: userEmail });
        let response = await SharingService.UpdateShare(payload);

        if (response?.status === 204) {
          SharingService.GetShareById(data._id as number).then((response) => setData(response));
          setUserEmail("");
          setServerValidation("");
        } else {
          setServerValidation(response.data);
        }
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
                <ListItemText primary={data?.owner} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" fontWeight="bold">
              Shared with
            </Typography>
            <List disablePadding>
              {data?.users && data.users.length > 0 ? (
                data.users.map((u) => (
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
  data: ISharing | undefined;
  setData: React.Dispatch<React.SetStateAction<ISharing | undefined>>;
}
