import React, { useEffect, useContext } from "react";
import { Grid, Paper, Typography, Link, IconButton } from "@mui/material";
import { LightMode as LightModeIcon, DarkMode as DarkModeIcon } from "@mui/icons-material";
import { ThemeContext } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "jose";
import LoginService from "../services/Login";

declare global {
  var google: any;
}

export default function Public({ ...props }: LoginProps) {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleCallback = (response: { credential: any }) => {
    const jwt = decodeJwt(response.credential);

    if (jwt.nonce === sessionStorage.getItem("nonce")) {
      sessionStorage.setItem("jwt", response.credential);
      if (typeof jwt.email === "string") {
        sessionStorage.setItem("email", jwt.email);

        // Check if user exists, create user if not
        LoginService.CheckIfUserExists(jwt.email);
      }

      navigate("/app/lists");
    }
  };

  useEffect(() => {
    // Generate nonce to prevent CSRF attacks
    const nonce = Math.random().toString();
    sessionStorage.setItem("nonce", nonce);

    globalThis.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_CLIENT_ID,
      callback: handleCallback,
      nonce: nonce,
    });

    globalThis.google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "filled_blue",
      size: "large",
    });
  }, []);

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
      <IconButton
        size="small"
        color="inherit"
        onClick={theme.toggleDarkMode}
        sx={{ position: "absolute", top: 15, right: 15 }}
      >
        {theme.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
      <Grid item container justifyContent="center" alignItems="center" spacing={5}>
        <Grid item sm={12} lg={6}>
          <Typography variant="h3" marginLeft={5}>
            Jabberwocky
          </Typography>
          <Typography variant="h6" marginLeft={5}>
            Because every developer needs to make a todo app
          </Typography>
        </Grid>
        <Grid item sm={12} lg={6} container justifyContent="center" alignItems="center">
          <div id="signInDiv" />
        </Grid>
      </Grid>
      <Grid item sx={{ position: "absolute", bottom: 0, width: "100vw" }}>
        <Paper sx={{ height: "100%", width: "100%" }}>
          <Grid container justifyContent="space-between" padding={3}>
            <Grid item>Jabberwocky</Grid>
            <Grid item>
              <Link href="https://github.com/alvinhuhhh/jabberwocky" color="inherit">
                Github
              </Link>
              <Typography variant="body1" color="inherit" marginLeft={3} display="inline">
                Copyright © Tan Wei Bing Alvin
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

interface LoginProps {}
