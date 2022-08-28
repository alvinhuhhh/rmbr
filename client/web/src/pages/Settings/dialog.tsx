import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from "@mui/material";

export default function AccountDeleteConfirmationDialog({
  open,
  setOpen,
  onConfirm,
  dialogTitle,
  dialogContent,
  dialogCancel,
  dialogConfirm,
  ...props
}: IAccountDeleteConfirmationDialogProps): JSX.Element {
  const [confirmationText, setConfirmationText] = useState<string>("");

  const onClose = () => {
    setConfirmationText("");
    setOpen(false);
  };

  return (
    <Dialog open={open} {...props}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        {dialogContent}
        <Typography sx={{ marginTop: 3 }}>
          Type <b>delete</b> to confirm
        </Typography>
        <TextField
          value={confirmationText}
          onChange={(event) => setConfirmationText(event.target.value)}
          variant="filled"
          placeholder="delete"
          size="small"
          hiddenLabel
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          {dialogCancel}
        </Button>
        <Button variant="contained" color="error" disabled={confirmationText !== "delete"} onClick={onConfirm}>
          {dialogConfirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface IAccountDeleteConfirmationDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: React.MouseEventHandler;
  dialogTitle: string;
  dialogContent: JSX.Element;
  dialogCancel: string;
  dialogConfirm: string;
}
