import React from "react";
import { Grid, List, ListItem, ListItemIcon, ListItemButton, ListItemText, Typography } from "@mui/material";

export default function Shared({ ...props }: ISharedProps): JSX.Element {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} xl={6}>
        <Typography variant="h5" fontWeight="bold" sx={{ margin: 2, marginBottom: 1 }}>
          Shared
        </Typography>
      </Grid>
    </Grid>
  );
}

interface ISharedProps {}
