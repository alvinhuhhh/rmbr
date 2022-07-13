import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Button } from "@mui/material";
import { IList } from "../../types/lists.types";

export default function ListDialog({ title, open, setOpen, data, setData, save, ...props }: IListDialogProps) {
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined = (event) => {
    const { name, value } = event.target;

    setData(
      (prevState) =>
        ({
          ...prevState,
          [name]: value,
        } as IList)
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
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" disabled={!Boolean(data?.title)} onClick={save}>
          Save
        </Button>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface IListDialogProps {
  title: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: IList | undefined;
  setData: React.Dispatch<React.SetStateAction<IList | undefined>>;
  save: React.MouseEventHandler;
}
