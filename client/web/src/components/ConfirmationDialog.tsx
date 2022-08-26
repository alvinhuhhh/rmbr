import React, { MouseEventHandler } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

export default function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  dialogTitle,
  dialogContent,
  dialogCancel,
  dialogConfirm,
  ...props
}: IConfirmationDialogProps): JSX.Element {
  return (
    <Dialog open={open} onClose={onClose} {...props}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          {dialogCancel}
        </Button>
        <Button variant="contained" onClick={onConfirm}>
          {dialogConfirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface IConfirmationDialogProps {
  open: boolean;
  onClose: MouseEventHandler;
  onConfirm: MouseEventHandler;
  dialogTitle: string;
  dialogContent: JSX.Element;
  dialogCancel: string;
  dialogConfirm: string;
}
