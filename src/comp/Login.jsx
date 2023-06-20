import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { FcGoogle } from 'react-icons/fc';
import { Box,Button,Center,Text } from '@chakra-ui/react';
import axios from 'axios';

export default function Login() {
  
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9000/login/user', {
        username,
        password
      });

      console.log(response.data); // Token received from the backend upon successful login

      // Do something after successful login, e.g., store the token in local storage or redirect to another page
      if (response.data.token) {
        // Store the token in local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username);
        localStorage.setItem('isLoggedIn', 'true');

        setIsLoggedIn(true); // Update the isLoggedIn stat
     
        navigate('/trade');
      } else {
        setErrorMessage(response.data.message);
      }

    } catch (error) {
      const errormessage = error.response.data; // Error message from the backend
      setErrorMessage(errormessage);
    }
  };

  // Check if the user is already logged in
  // If the token exists in local storage, redirect to the home page
  const token = localStorage.getItem('token');
  if (token) {
    navigate('/trade');
  }

  return (
    <div className="parent vh-100 d-flex justify-content-center align-items-center">
      <div className="login-box">
        <p>Login</p>
        <form onSubmit={handleLogin}>
          <div className="user-box">
            <input
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>User Name</label>
          </div>
          <div className="user-box">
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <div>
            <button className="button1" type="submit">Login</button>
          </div>
        </form>
        {errorMessage && <p className="error-message"> <h5 className='text-danger'>{errorMessage}</h5></p>}
        <p>
          Don't have an account? <a href="/signup" className="a2 text-white">Register</a>
          <Button mt={10} w={'full'} variant={'outline'} leftIcon={<FcGoogle />}>
          <Center className='hello' display={'flex'} alignItems={'center'}>
            <Text  >Sign in with Google</Text>
          </Center>
        </Button>
        </p>
      </div>
    </div>
  );
}
