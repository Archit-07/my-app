import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'; // Add this import
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Check if the user exists in localStorage (by username or email)
    const data = JSON.parse(localStorage.getItem('users'));
   
    const userExists = data.find(user => user.username === text || user.email.toLowerCase() === text.toLowerCase());

    if (userExists) {
      const storedPassword = userExists.password;
      if (password === storedPassword) {
        localStorage.setItem('loggedIn', true);
        navigate('/menu', { state: userExists });
      } else {
        alert('Incorrect password');
      }
    } else {
      alert('User not found');
    }
  };

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10%' }}>
        <Box sx={{ display: 'flex', gap: '16px' }}>
          <TextField
            label="Username or Email"
            value={text}
            onChange={handleInputChange}
            required
            error={Boolean(usernameError || emailError)}
            helperText={usernameError || emailError}
          />
          <FormControl>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((show) => !show)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Box>
        <Button
          type="submit"
          variant="contained"
          disabled={!text || !password}
          sx={{ marginTop: '1rem' }}
        >
          Sign In
        </Button>
        <Link to="/signup">
          <Button type="button" sx={{ marginTop: '1rem' }}>Sign Up</Button>
        </Link>
      </Box>
    </form>
  );
};

export default LoginForm;
