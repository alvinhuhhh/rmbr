import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Grid, AppBar, Toolbar, Drawer, IconButton, Typography, List, ListItem, ListItemButton } from "@mui/material";
import { Menu as MenuIcon, LightMode as LightModeIcon, DarkMode as DarkModeIcon } from "@mui/icons-material";

export default function App() {
  const drawerWidth = 250;
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSettingsClick = () => {};

  const handleLogoutClick = () => {
    sessionStorage.clear();
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
            Jabberwocky
          </Typography>
          <IconButton size="small" color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
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
            <ListItemButton onClick={handleSettingsClick}>
              <Typography variant="h6">Settings</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogoutClick}>
              <Typography variant="h6">Logout</Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Outlet />
    </Grid>
  );
}
