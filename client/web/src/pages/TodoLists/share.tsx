import React from "react";
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
} from "@mui/material";
import { IList } from "../../types/lists.types";
import SharedService from "../../services/Shared/shared.service";

export default function ShareDialog({ title, open, setOpen, data, setData, ...props }: IShareDialogProps): JSX.Element {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
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
          <Grid item xs={12}>
            <Typography variant="body1" fontWeight="bold" sx={{ marginBottom: 1 }}>
              Share with
            </Typography>
            <TextField name="user" variant="filled" size="small" hiddenLabel fullWidth />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Finish
        </Button>
      </DialogActions>
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
