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
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleLoginChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const [errors, setErrors] = useState({});
  const [emailNotFoundErr, setEmailNotFoundErr] = useState('');

  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/login', userData, {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        console.log("tttttttttttt",res.data);
        localStorage.setItem('userLogedIn', JSON.stringify(res.data.user))
        navigate('/dashboard');
      })
      .catch((err) => {
        // console.log('*********************', err.response.data);
        setEmailNotFoundErr(err.response.data.msg);
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
            md={8}
            sx={{
              backgroundImage: 'url(https://images.pexels.com/photos/258045/pexels-photo-258045.jpeg)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
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
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={handleLoginSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus

                  onChange={handleLoginChange}
                /><p className='text-danger'    >{errors.email}</p>
                <p className='text-danger'      >{emailNotFoundErr && emailNotFoundErr}</p>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleLoginChange}
                /><p className='text-danger'       >{errors.password}</p>

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ backgroundColor: 'black' }}
                >
                  Sign In
                </Button>
                <Grid container>

                  <Grid item>
                    <Link href="/" variant="body2">
                      {"Don't have an account? Sign Up"}
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

export default Login;
