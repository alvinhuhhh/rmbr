import React, { useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Grid,
  AppBar,
  Toolbar,
  Drawer,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ListAlt as ListIcon,
  People as SharedIcon,
  Delete as TrashIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { ThemeContext } from "../contexts/ThemeContext";

export default function App() {
  const drawerWidth = 250;
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleListsClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
    navigate("/app/lists");
  };

  const handleSharedClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
    navigate("/app/shared");
  };

  const handleTrashClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
    navigate("/app/trash");
  };

  const handleSettingsClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
    navigate("/app/settings");
  };

  const handleLogoutClick = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };

  return (
    <Grid container>
      <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rmbr
          </Typography>
          <IconButton size="small" color="inherit" onClick={theme.toggleDarkMode}>
            {theme.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{ width: drawerWidth, [`& .MuiDrawer-paper`]: { width: drawerWidth } }}
      >
        <Toolbar />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleListsClick}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Lists" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleSharedClick}>
              <ListItemIcon>
                <SharedIcon />
              </ListItemIcon>
              <ListItemText primary="Shared" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleTrashClick}>
              <ListItemIcon>
                <TrashIcon />
              </ListItemIcon>
              <ListItemText primary="Trash" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={handleSettingsClick}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogoutClick}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Outlet />
    </Grid>
  );
}
