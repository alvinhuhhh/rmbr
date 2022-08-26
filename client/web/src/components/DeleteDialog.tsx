import React, { MouseEventHandler } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

export default function DeleteDialog({
  open,
  onClose,
  onConfirm,
  itemType,
  itemName,
  ...props
}: IDeleteDialogProps): JSX.Element {
  return (
    <Dialog open={open} onClose={onClose} {...props}>
      <DialogTitle>{`Delete ${itemType}?`}</DialogTitle>
      <DialogContent>
        Are you sure you want to delete <b>{itemName}</b> {itemType === "permanently" && "permanently"}?
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface IDeleteDialogProps {
  open: boolean;
  onClose: MouseEventHandler;
  onConfirm: MouseEventHandler;
  itemType: string;
  itemName: string;
}
