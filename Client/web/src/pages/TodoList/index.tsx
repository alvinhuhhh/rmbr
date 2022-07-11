import React from "react";
import { Grid, List, ListItem } from "@mui/material";

export default function TodoList({ ...props }: TodoListProps) {
  return (
    <Grid container justifyContent="center">
      <List>
        <ListItem divider>This is a todo</ListItem>
        <ListItem divider>Hello world</ListItem>
        <ListItem divider>Hello world</ListItem>
      </List>
    </Grid>
  );
}

interface TodoListProps {}
