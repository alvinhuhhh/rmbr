import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Button,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { IList } from "../../types/lists.types";
import SharedService from "../../services/Shared/shared.service";

export default function ShareDialog({ title, open, setOpen, data, setData, ...props }: IShareDialogProps): JSX.Element {
  const [userEmail, setUserEmail] = useState<string>("");

  const onClose = () => {
    setUserEmail("");
    setOpen(false);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined = (event) => {
    const { value } = event.target;
    setUserEmail(value);
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
            {data?.createdBy}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" fontWeight="bold">
              Shared with
            </Typography>
            {data?.sharedUsers && data.sharedUsers.length > 0 ? (
              data.sharedUsers.map((u) => <Typography key={u.email}>{u.email}</Typography>)
            ) : (
              <Typography>No users</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} container justifyContent="center" alignItems="center" spacing={1}>
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
              />
            </Grid>
            <Grid item>
              <Button variant="contained">Share</Button>
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
