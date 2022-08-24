import React from "react";
import { Grid, List, ListItem, ListItemIcon, ListItemButton, ListItemText, Typography } from "@mui/material";

export default function Trash({ ...props }: ITrashProps): JSX.Element {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} xl={6}>
        <Typography variant="h5" fontWeight="bold" sx={{ margin: 2, marginBottom: 1 }}>
          Trash
        </Typography>
      </Grid>
    </Grid>
  );
}

interface ITrashProps {}
