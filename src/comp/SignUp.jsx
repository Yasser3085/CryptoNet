import React, { useState } from 'react';
import '../App.css';
import { Box } from '@chakra-ui/react';
import axios from 'axios';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleRegistration = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:9000/register/user', {
        username,
        email,
        password
      });

      console.log(response.data); // The response from the backend

    } catch (error) {
      console.error(error.response.data); // Error message from the backend
      
    }
  };

  return (
    <div className="parent vh-100 d-flex justify-content-center align-items-center">
      <div className="login-box">
        <p>Register</p>
        <form onSubmit={handleRegistration}>
          <div className="user-box">
            <input
              required
              type="text"
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>User Name</label>
          </div>
          <div className="user-box">
            <input
              required
              name='email'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              required
              name='password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <div>
            <button className="button1" type="submit">SIGN UP</button>
          </div>
        </form>
        <p>
          have an account? <a href="/login" className="a2 text-white">Login</a>
        </p>
      </div>
    </div>
  );
}
