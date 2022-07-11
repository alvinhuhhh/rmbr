import React, { SetStateAction, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Button } from "@mui/material";
import TodoListsService from "../../services/TodoLists/todolists.service";

export default function ListDialog({ title, open, setOpen, data, setData, save, ...props }: ListDialogProps) {
  const handleInputChange = () => {};

  return <Dialog open={open}></Dialog>;
}

interface ListDialogProps {
  title: string;
  open: boolean;
  setOpen: SetStateAction<boolean>;
  data: IList;
  setData: SetStateAction<IList>;
  save: Function;
}
