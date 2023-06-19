import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

import { Box } from '@chakra-ui/react';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9000/login/user', {
        username,
        password
      });

      console.log(response.data); 


      if (response.data.token) {
        // Store the token in local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username);

        setIsLoggedIn(true);
        navigate('/home');
      } else {
        setErrorMessage(response.data.message);
      }

    } catch (error) {
      const errormessage = error.response.data; // Error message from the backend
      setErrorMessage(errormessage);
    }
  };

  // Check if the user is already logged in
  
  const token = localStorage.getItem('token');
  if (token) {
    navigate('/home');
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
        </p>
      </div>
    </div>
  );
}
