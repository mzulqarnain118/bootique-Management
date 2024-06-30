import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
function Register() {

  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: ""
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
    if (formData.password !== formData.confirmpassword) {
      alert("Passwords do not match");
      return;
    }
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/register', {
        username: formData.firstname + ' ' + formData.lastname,
        email: formData.email,
        password: formData.password
      });
      if (response.status === 201) {
        alert('User registered successfully');
        navigate('/login');
      } else {
        alert('Failed to register');
      }
    } catch (error) {
      console.error("There was an error registering the user!", error);
      alert('An error occurred during registration');
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
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
        }}>
          <TextField
            label="First Name"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
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
          <TextField
            label="Confirm Password"
            name="confirmpassword"
            type="password"
            value={formData.confirmpassword}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <Button type="submit" variant="contained" color="secondary" fullWidth>
            Register
          </Button>
          <Typography>
            Already have an account? <a href="/login">Login here</a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
