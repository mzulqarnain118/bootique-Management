// // Header.js
// import React, { useContext } from "react";
// import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
// import ShoppingCart from "@mui/icons-material/ShoppingCart";
// import { AuthContext } from '../Components/AuthContext';

// function Header() {
//   const { isAuthenticated, logout } = useContext(AuthContext);

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" style={{ flexGrow: 1, margin: 4 }}>
//           Ethnic Wear
//         </Typography>
//         <Button color="inherit" href="/">Home</Button>
//         <Button color="inherit" href="/dresses">Dresses</Button>
//         <Button color="inherit" href="/dupattas">Dupattas</Button>
//         <Button color="inherit" href="/tops">Tops</Button>
//         <Button color="inherit" href="/bottoms">Bottoms</Button>
//         <Button color="inherit" href="/newarrival">New Arrival</Button>
//         <Button color="inherit" href="/offers">Offers</Button>
//         <Button color="inherit" href="/product">Featured Product</Button>
//         {isAuthenticated ? (
//           <Button color="inherit" onClick={logout}>Logout</Button>
//         ) : (
//           <Button color="inherit" href="/login">Login</Button>
//         )}
//         <IconButton color="inherit" href='/cart'>
//           <ShoppingCart />
//         </IconButton>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default Header;
// Header.js
// Header.js
import React, { useContext, useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, List, ListItem, ListItemText, Hidden } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { AuthContext } from '../Components/AuthContext';

function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', href: '/' },
    { text: 'Dresses', href: '/dresses' },
    { text: 'Dupattas', href: '/dupattas' },
    { text: 'Tops', href: '/tops' },
    { text: 'Bottoms', href: '/bottoms' },
    { text: 'New Arrival', href: '/newarrival' },
    { text: 'Offers', href: '/offers' },
    { text: 'Featured Product', href: '/product' }
  ];

  const drawer = (
    <Box
      sx={{ width: 350 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem button component="a" href={item.href} key={item.text}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {isAuthenticated ? (
          <ListItem button onClick={logout}>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem button component="a" href="/login">
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Ethnic Wear
        </Typography>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          {drawer}
        </Drawer>
        <Hidden mdDown>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {menuItems.map((item) => (
              <Button color="inherit" href={item.href} key={item.text}>
                {item.text}
              </Button>
            ))}
            {isAuthenticated ? (
              <Button color="inherit" onClick={logout}>Logout</Button>
            ) : (
              <Button color="inherit" href="/login">Login</Button>
            )}
          </Box>
        </Hidden>
        <IconButton color="inherit" href='/cart'>
          <ShoppingCart />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
