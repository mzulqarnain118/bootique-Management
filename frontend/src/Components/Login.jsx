// Login.js
import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Components/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/login', {
        email: formData.email,
        password: formData.password
      });
      if (response.status === 200) {
        alert('Login successful');
        login(response.data.user);
        navigate('/');
      } else {
        alert('Failed to login');
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
      alert('Invalid credentials');
    }
  }
  return (
    <Container maxWidth="sm">
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
        border: '1px solid gray',
        borderRadius: 2,
        p: 3,
      }}>
        <Typography component="h2" variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
        }}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <Button type="submit" variant="contained" color="secondary" fullWidth>
            Signin
          </Button>
          <Typography>
            Don't have an account? <a href="/register">Register here</a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
