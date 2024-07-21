import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [gender, setGender] = useState('male'); // Default to male
  const [age, setAge] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const [ageError, setAgeError] = useState('');

  const handleAgeChange = (e) => {
    const inputAge = e.target.value;
    const numericAge = parseInt(inputAge, 10); // Convert to a number

    if (isNaN(numericAge) || numericAge <= 0) {
      setAgeError('Age must be greater than 0');
      setAge(numericAge);
    } else {
      setAgeError('');
      setAge(numericAge);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // Check username uniqueness
    if (usernameExists(username)) {
      setUsernameError('Username already exists');
      return;
    } else {
      setUsernameError('');
    }

    // Check email uniqueness
    if (emailExists(email)) {
      setEmailError('Email already exists');
      return;
    } else {
      setEmailError('');
    }

    if(ageError) {
      return;
    }

    // Create a user object
    const user = {
      username,
      email,
      password,
      fullname,
      gender,
      age: parseInt(age),
      loggedIn: false
    };

    // Save user data to localStorage
    console.log(user);
    const data = localStorage.getItem('users');
    let allUsers;
    if(!data) {
      allUsers = [];
    } else {
      allUsers = JSON.parse(data);
    }
    localStorage.setItem('users', JSON.stringify([...allUsers, user]));
    navigate("/");
    // Redirect to login page (if needed)
    // Example: window.location.href = '/login';
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate("/");
  }

  const usernameExists = (newUsername) => {
    // Retrieve existing usernames from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    return existingUsers.some((user) => user.username === newUsername);
  };

  const emailExists = (newEmail) => {
    // Retrieve existing emails from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    return existingUsers.some((user) => user.email === newEmail);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSignup}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '400px',
        margin: '10% auto',
      }}
    >
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        error={!!usernameError}
        helperText={usernameError}
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <TextField
        label="Full Name"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        required
      />
      <FormControl component="fieldset">
        <RadioGroup
          row
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>
      <TextField
        label="Age"
        type="number"
        value={age}
        onChange={handleAgeChange}
        required
        error={!!ageError}
        helperText={ageError}
      />
      <Button type="submit" variant="contained">
        Sign Up
      </Button>
      <Button onClick={handleSignIn} variant="contained">
        Sign In
      </Button>
    </Box>
  );
};

export default SignupForm;
