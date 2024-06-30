// Header.js
import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { AuthContext } from '../Components/AuthContext';

function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, margin: 4 }}>
          Ethnic Wear
        </Typography>
        <Button color="inherit" href="/">Home</Button>
        <Button color="inherit" href="/dresses">Dresses</Button>
        <Button color="inherit" href="/dupattas">Dupattas</Button>
        <Button color="inherit" href="/tops">Tops</Button>
        <Button color="inherit" href="/bottoms">Bottoms</Button>
        <Button color="inherit" href="/newarrival">New Arrival</Button>
        <Button color="inherit" href="/offers">Offers</Button>
        <Button color="inherit" href="/product">Featured Product</Button>
        {isAuthenticated ? (
          <Button color="inherit" onClick={logout}>Logout</Button>
        ) : (
          <Button color="inherit" href="/login">Login</Button>
        )}
        <IconButton color="inherit" href='/cart'>
          <ShoppingCart />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
