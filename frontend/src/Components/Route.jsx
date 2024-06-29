import React, { createContext, useState } from 'react';
import {Routes,Route} from 'react-router-dom'
import CartProduct from './CartProduct'
import FeaturedProducts from './FeaturedProducts';
 const Route =({cart,setCart})=>{

   
   
   return (
  <>
  <Routes>
    <Route path='/product' element={<FeaturedProducts product={product} setProduct={setProduct}/>}>Products</Route>
    <Route path='/cart' element={CartProduct} cart={cart} setCart={setCart}>Cart</Route>

  </Routes>
  <h1>Route Page</h1></>
  );
};
export default Route