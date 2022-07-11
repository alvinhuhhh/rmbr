import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "jose";

declare global {
  var google: any;
}

export default function Public({ ...props }: LoginProps) {
  const navigate = useNavigate();

  const handleCallback = (response: { credential: any }) => {
    const jwt = decodeJwt(response.credential);

    if (jwt.nonce === sessionStorage.getItem("nonce")) {
      sessionStorage.setItem("jwt", response.credential);
      if (typeof jwt.email === "string") sessionStorage.setItem("email", jwt.email);
      navigate("/app");
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
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
      <div id="signInDiv" />
    </Grid>
  );
}

interface LoginProps {}
