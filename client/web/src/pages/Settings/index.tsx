import React from "react";
import { Grid, List, ListItem, ListItemIcon, ListItemButton, ListItemText, Typography, Avatar } from "@mui/material";
import SettingsService from "../../services/Settings/settings.service";

export default function Settings({ ...props }: ISettingsProps): JSX.Element {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} xl={6}>
        <Typography variant="h5" fontWeight="bold" sx={{ margin: 2, marginBottom: 1 }}>
          Settings
        </Typography>
      </Grid>
      <Grid item xs={12} xl={6}>
        <Avatar src={localStorage.getItem("imageurl") as string} sx={{ height: 96, width: 96, margin: 3 }} />
        <Typography variant="body1" fontWeight="bold" sx={{ marginLeft: 3 }}>
          {localStorage.getItem("fullname")}
        </Typography>
        <Typography variant="body1" sx={{ marginLeft: 3 }}>
          {localStorage.getItem("email")}
        </Typography>
      </Grid>
    </Grid>
  );
}

interface ISettingsProps {}
