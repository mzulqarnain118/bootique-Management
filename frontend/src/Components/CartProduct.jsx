import React, { useContext, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import axios from 'axios';

const CartProduct = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/cart');
      if (response.status === 200) {
        setCartItems(response.data);
      } else {
        console.error('Failed to fetch cart items');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };
  return (
    <>
      <Box sx={{ my: 1 }}>
        <Typography variant="h4" gutterBottom sx={{textAlign:'center',
        fontWeight:600,fontSize:30
          
        }}>
          Cart Products
        </Typography>
        <Grid container spacing={4}>
          {cartItems?.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={`../assets/images/${product.img}`}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => setCart((old) => [...old, product])}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
export default CartProduct;
