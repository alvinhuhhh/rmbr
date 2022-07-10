import React, { useState } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Button,
} from "@mui/material";

export default function TodoDialog({
  title,
  open,
  setOpen,
  data,
  setData,
  save,
  ...props
}) {
  // methods
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
        <Button variant="contained" onClick={save}>
          Save
        </Button>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
