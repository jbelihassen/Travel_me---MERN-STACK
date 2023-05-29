import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const Register = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegisterChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [dublicatedEmailErr, SetdublicatedEmailErr] = useState('');

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/users', userData, {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userLogedIn', JSON.stringify(res.data.user))
        navigate('/dashboard');
      })
      .catch((err) => {
        // console.log('*********************', err.response.data);
        SetdublicatedEmailErr(err.response.data.msg);
        const errResponse = err.response.data.errors;
        console.log(errResponse);
        const errObj = {};
        for (const key of Object.keys(errResponse)) {
          errObj[key] = errResponse[key].message;
        }
        setErrors(errObj);
      });
  };
  const theme = createTheme();
  return (

    

      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{

              backgroundImage: 'url(https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            
          >
            <Typography sx={{ m: 5 }}  align="center" variant="h6" >Welcome to <span style={{ fontSize: 30,color: 'GoldenRod' }}>Travel_me</span>, a platform for sharing travel experiences and discovering new destinations</Typography>
            </Grid>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleRegisterSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus

                      onChange={handleRegisterChange}
                    />
                    <p className='text-danger'>{errors.firstName}</p>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"

                      onChange={handleRegisterChange}
                    /><p className='text-danger'       >{errors.lastName}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"

                      onChange={handleRegisterChange}
                    /><p className='text-danger'         >{errors.email}</p>
                    <p>{dublicatedEmailErr && dublicatedEmailErr}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"

                      onChange={handleRegisterChange}
                    /><p className='text-danger'      >{errors.password}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"

                      onChange={handleRegisterChange}
                    /><p className='text-danger'     >{errors.confirmPassword}</p>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ backgroundColor: 'black' }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>

   

  )
}
export default Register;
