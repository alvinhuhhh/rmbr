import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Avatar, Button } from "@mui/material";
import SettingsService from "../../services/Settings/settings.service";
import AccountDeleteConfirmationDialog from "./dialog";

export default function Settings({ ...props }: ISettingsProps): JSX.Element {
  const email: string = localStorage.getItem("email") as string;
  const navigate = useNavigate();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const handleDeleteAccountClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    let response = await SettingsService.DeleteUser(email);
    if (response.status === 204) {
      // Revoke Google OAuth grant
      globalThis.google.accounts.id.revoke(email, (response) => {
        if (response.successful) {
          // Log out
          sessionStorage.clear();
          localStorage.clear();
          navigate("/");
        } else console.log(response.error);
      });
    }
  };

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
        <Button variant="contained" color="error" onClick={handleDeleteAccountClick}>
          Delete Account
        </Button>
      </Grid>
      <AccountDeleteConfirmationDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        dialogTitle="Delete account?"
        dialogContent={
          <React.Fragment>
            <Typography>
              Are you sure you want to <b>permanently</b> delete account?
            </Typography>
            <Typography sx={{ marginTop: 1 }}>• All data will be deleted permanently</Typography>
            <Typography>• All users will lose access to shared lists</Typography>
            <Typography>• Google OAuth grant will be revoked</Typography>
          </React.Fragment>
        }
        dialogCancel="Cancel"
        dialogConfirm="Delete Account"
      />
    </Grid>
  );
}

interface ISettingsProps {}
