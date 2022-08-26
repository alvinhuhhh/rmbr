import React from "react";
import { Grid, Typography, Avatar, Button } from "@mui/material";
import SettingsService from "../../services/Settings/settings.service";

export default function Settings({ ...props }: ISettingsProps): JSX.Element {
  return (
    <Grid container justifyContent="center" sx={{ margin: 2 }}>
      <Grid item xs={12} xl={6}>
        <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 3 }}>
          Settings
        </Typography>
        <Avatar
          src={localStorage.getItem("profilepicurl") as string}
          sx={{ height: 132, width: 132, marginBottom: 3 }}
        />
        <Typography variant="body1" fontWeight="bold">
          {localStorage.getItem("fullname")}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          {localStorage.getItem("email")}
        </Typography>
        <Button variant="contained" color="error">
          Delete Account
        </Button>
      </Grid>
    </Grid>
  );
}

interface ISettingsProps {}
