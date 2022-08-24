import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Button } from "@mui/material";
import { ITodo } from "../../types/todo.types";

export default function TodoDialog({
  title,
  open,
  setOpen,
  data,
  setData,
  save,
  ...props
}: ITodoDialogProps): JSX.Element {
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined = (event) => {
    const { name, value } = event.target;

    setData(
      (prevState) =>
        ({
          ...prevState,
          [name]: value,
        } as ITodo)
    );
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Title"
              value={data?.title || ""}
              onChange={handleInputChange}
              variant="filled"
              fullWidth
            />
            <TextField
              name="description"
              label="Description"
              value={data?.description || ""}
              onChange={handleInputChange}
              variant="filled"
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="contained" disabled={!Boolean(data?.title)} onClick={save}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface ITodoDialogProps {
  title: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: ITodo | undefined;
  setData: React.Dispatch<React.SetStateAction<ITodo | undefined>>;
  save: React.MouseEventHandler;
}
