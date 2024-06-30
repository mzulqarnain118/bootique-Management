import React, { useContext,useEffect,useState } from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { CartContext } from './CartContext'; // Import the CartContext
import axios from 'axios';


function NewArrivals() {
  const { cart, setCart } = useContext(CartContext); // Access context
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getFeaturedProducts = async () => {
      const data = await fetchFeaturedProducts();
      setProducts(data);
    };
    getFeaturedProducts();
  }, []);
  
  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/products', {
        params: {
          type: 'new_arrival'
        }
      });
      return response.data;
    } catch (error) {
      console.log(error)
      console.error('Failed to fetch featured products:', error);
      return [];
    }
  };
  const addtoCart = (product) => {
    const exist = cart.find((prod) => prod.id === product.id);
    if (exist) {
      alert("This product is already added to cart");
    } else {
      setCart((old) => [...old, product]);
      alert("Product is added to cart successfully");
    }
  };

  return (
    <Box sx={{ my: 1 }}>
      <Typography variant="h4" gutterBottom>
        New Arrivals
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <Card>
            <CardMedia
                component="img"
                height="200"
                image={product.img}
                alt={product.name}
              />
              <CardContent sx={{
                display:'flex',
                flexDirection:'column',

              }}>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="p"><b>Stock</b>:           {product.stock}</Typography>
                <Typography variant="p"><b>Colors</b>:   {"    "}{product.colors}</Typography>
                <Typography variant="p"> <b>Size:</b>    {product.sizes}</Typography>




                <Typography variant="p"><b>Price</b>:                  {product.price}</Typography>
                <Button variant="contained" sx={{ my: 2 }} color="secondary" href="/cart">
                  Visit Cart
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => addtoCart(product)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default NewArrivals;
