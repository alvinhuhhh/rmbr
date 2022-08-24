import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Button,
  MenuItem,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Bookmark as PriorityIcon } from "@mui/icons-material";
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="priority"
              label="Priority"
              value={data?.priority || -1}
              onChange={handleInputChange}
              variant="filled"
              fullWidth
              select
              SelectProps={{
                renderValue: (value: unknown) => {
                  switch (value as number) {
                    case -1:
                      return (
                        <ListItem disableGutters disablePadding>
                          <ListItemText>None</ListItemText>
                        </ListItem>
                      );
                    case 3:
                      return (
                        <ListItem disableGutters disablePadding>
                          <ListItemIcon>
                            <PriorityIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Low</ListItemText>
                        </ListItem>
                      );
                    case 2:
                      return (
                        <ListItem disableGutters disablePadding>
                          <ListItemIcon>
                            <PriorityIcon color="warning" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Medium</ListItemText>
                        </ListItem>
                      );
                    case 1:
                      return (
                        <ListItem disableGutters disablePadding>
                          <ListItemIcon>
                            <PriorityIcon color="error" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>High</ListItemText>
                        </ListItem>
                      );
                    default:
                      break;
                  }
                },
              }}
            >
              <MenuItem key={-1} value={-1}>
                <ListItemText>None</ListItemText>
              </MenuItem>
              <MenuItem key={3} value={3}>
                <ListItemIcon>
                  <PriorityIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText>Low</ListItemText>
              </MenuItem>
              <MenuItem key={2} value={2}>
                <ListItemIcon>
                  <PriorityIcon color="warning" fontSize="small" />
                </ListItemIcon>
                <ListItemText>Medium</ListItemText>
              </MenuItem>
              <MenuItem key={1} value={1}>
                <ListItemIcon>
                  <PriorityIcon color="error" fontSize="small" />
                </ListItemIcon>
                <ListItemText>High</ListItemText>
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
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
