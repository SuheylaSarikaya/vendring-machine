import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import   { useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';




// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function Login() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError]= useState(false);
  const [isLogin,setLogin]=useState(false);
  const navigate = useNavigate();

 

  const [state, setState] = useState(false);
   const login = async (user)=>{
     fetch('/api/vendingMachine/login',{
        body: JSON.stringify(user),
        method: "POST", headers: {
        "Content-Type": "application/json",
        
    }})
    .then(
      async ( response) => {
            const data= await response.json();
            setIsLoaded(false);
            console.log(data);
            if(data.result==='User is logged in.'){ 
            navigate('/adminPage');
            localStorage.setItem("auth",JSON.stringify(user));
          }else{

            localStorage.removeItem("auth");
            setIsLoaded(false);
            setError(true);
            alert("Login failed.");
          }
        },
        (error) => {
          localStorage.removeItem("auth");
            setIsLoaded(false);
            setError(true);
          
        }          
    )    
  }

  useEffect(() => {
    if(localStorage.getItem("auth")){
      navigate('/adminPage');
    }
  }, []);  
  



  const handleLogin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let user=({
      username: data.get('email'),
      password: data.get('password'),
    });  
    await login(user);
  
  
  };
  
  return (
    <div>
    <div>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleLogin } noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              type="login"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>

          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
    </div>
   
    
  </div>
  );
}

export default Login;