import React from "react";
import { Typography } from "@mui/material";

export default function Settings({ ...props }: ISettingsProps): JSX.Element {
  return <Typography variant="h6">Settings</Typography>;
}

interface ISettingsProps {}
