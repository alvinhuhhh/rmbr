import React from "react";
import { Grid, Button } from "@mui/material";
import {} from "@mui/icons-material";

export default function Login({ ...props }: LoginProps) {
  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh", bgcolor: "#000" }}>
      <Button variant="contained">LOGIN</Button>
    </Grid>
  );
}

interface LoginProps {}
