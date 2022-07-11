import React, { useState, useEffect } from "react";
import { Grid, List, ListItem, Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import TodoListsService from "../../services/TodoLists/todolists.service";
import ListDialog from "./dialog";

export default function TodoLists({ ...props }: TodoListsProps) {
  const [lists, setLists] = useState<Array<IList>>([]);

  useEffect(() => {
    TodoListsService.GetLists().then((data) => setLists(data));
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <List>
          {lists.length > 0 ? (
            lists.map((list) => <ListItem divider>Hello</ListItem>)
          ) : (
            <ListItem>No lists found. Create one!</ListItem>
          )}
        </List>
      </Grid>
      <Fab size="large" color="secondary" sx={{ position: "absolute", bottom: 15, right: 15 }}>
        <AddIcon />
      </Fab>
    </Grid>
  );
}

interface TodoListsProps {}
