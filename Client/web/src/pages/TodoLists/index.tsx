import React from "react";
import { Grid, List, ListItem, Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

export default function TodoLists({ ...props }: TodoListsProps) {
  return (
    <Grid container justifyContent="center">
      <List>
        <ListItem divider>Hello world</ListItem>
        <ListItem divider>Hello world</ListItem>
        <ListItem divider>Hello world</ListItem>
      </List>
      <Fab size="large" color="secondary" sx={{ position: "absolute", bottom: 15, right: 15 }}>
        <AddIcon />
      </Fab>
    </Grid>
  );
}

interface TodoListsProps {}
