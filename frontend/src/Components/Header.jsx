import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Login from '../Components/Login'
import CartProduct from "./CartProduct";
function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Ethnic Wear
        </Typography>
        <Button color="inherit"  href="/">Home</Button>
        <Button color="inherit"  href="/dresses">Dresses</Button>
        <Button color="inherit"  href="/dupattas">Dupattas</Button>
        <Button color="inherit"  href="/tops">Tops</Button>
        <Button color="inherit"  href="/bottoms">Bottoms</Button>
        <Button color="inherit"  href="/sale">Sale</Button>
        <Button color="inherit" href="/login">Login</Button>

        <IconButton color="inherit"  href='/cart'>
          <ShoppingCart  />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
