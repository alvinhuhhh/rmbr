import React, { useEffect, useContext } from "react";
import { Grid, Paper, Typography, Link, IconButton } from "@mui/material";
import { LightMode as LightModeIcon, DarkMode as DarkModeIcon } from "@mui/icons-material";
import { ThemeContext } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { decodeJwt, JWTPayload } from "jose";
import UserService from "../services/User/user.service";

export default function Public({ ...props }: LoginProps) {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  const loginSuccess = (jwt: JWTPayload): void => {
    localStorage.setItem("id", jwt.sub as string);
    localStorage.setItem("fullname", jwt.name as string);
    localStorage.setItem("givenname", jwt.given_name as string);
    localStorage.setItem("familyname", jwt.family_name as string);
    localStorage.setItem("profilepicurl", jwt.picture as string);
    localStorage.setItem("email", jwt.email as string);

    navigate("app/lists");
  };

  const loginFailure = (status: number, statusText: string): void => {
    console.log(`${status}: ${statusText}`);
    localStorage.clear();
  };

  useEffect(() => {
    // Generate nonce to prevent CSRF attacks
    const nonce = Math.random().toString();
    sessionStorage.setItem("nonce", nonce);

    const handleCallback = (response: { credential: any }) => {
      const jwt = decodeJwt(response.credential);

      if (jwt.nonce === sessionStorage.getItem("nonce")) {
        localStorage.setItem("jwt", response.credential);
        // Check if user exists
        UserService.CheckIfUserExists(jwt)
          .then((loginResponse) => {
            if (loginResponse?.status === 200) loginSuccess(jwt);
            else if (loginResponse?.status === 404)
              UserService.CreateUser(jwt).then((response) => response.status === 201 && loginSuccess(jwt));
            else loginFailure(loginResponse?.status, loginResponse?.statusText);
          })
          .catch((err: any) => {
            console.log(err);
          });
      } else {
        console.log("Nonce error when logging in");
      }
    };

    globalThis.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_CLIENT_ID as string,
      callback: handleCallback,
      nonce: nonce,
    });

    globalThis.google.accounts.id.renderButton(document.getElementById("signInDiv") as HTMLElement, {
      theme: "filled_blue",
      size: "large",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Grid container justifyContent="center" alignItems="center" flexDirection="column" sx={{ height: "100vh" }}>
        <IconButton
          size="small"
          color="inherit"
          onClick={theme.toggleDarkMode}
          sx={{ position: "absolute", top: 15, right: 15 }}
        >
          {theme.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <Grid item>
          <Typography variant="h1" display="inline">
            Rmbr
          </Typography>
          <Typography variant="h4" display="inline">
            .app
          </Typography>
        </Grid>
        <Grid item paddingTop={15}>
          <div id="signInDiv" />
        </Grid>
      </Grid>
      <Grid container>
        <Paper sx={{ height: "100%", width: "100%" }}>
          <Grid container justifyContent="space-between" padding={3}>
            <Grid item>Rmbr.app</Grid>
            <Grid item>
              <Link href="https://github.com/alvinhuhhh/rmbr" color="inherit">
                Github
              </Link>
              <Typography variant="body1" color="inherit" marginLeft={3} display="inline">
                Copyright © Tan Wei Bing Alvin
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}

interface LoginProps {}
