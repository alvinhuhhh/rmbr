import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Button } from "@mui/material";

export default function ShareDialog({
  title,
  open,
  setOpen,
  data,
  setData,
  save,
  ...props
}: IShareDialogProps): JSX.Element {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="contained">Share</Button>
      </DialogActions>
    </Dialog>
  );
}

interface IShareDialogProps {
  title: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  save: React.MouseEventHandler;
}
