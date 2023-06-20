import React, { useState, useEffect } from 'react';
import '../App.css';
import { Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import '@fontsource/viga';
import { FaEthereum } from 'react-icons/fa';
import {FiLogOut}from 'react-icons/fi';
import '@fontsource-variable/readex-pro';
import { color } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    

    if (token) {
      setIsLoggedIn(true);
      const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  return (
    <div className="p-3 d-flex  navbar navbar-expand-lg navbar-dark navbar">
    <div className="d-flex me-auto" style={{ margin: '0px 10rem' }}>
      <FaEthereum color={'#FAEF88'} size={35} />
      <Link to="/" className="link">
        <Text as={'h1'} fontSize={'3xl'} fontFamily={'Viga'} borderLeft={'1px solid white'}>
          CryptoNet
        </Text>
      </Link>
    </div>
  
    <div className="d-flex w-100 align-items-center justify-content-between  " style={{ margin: '0px 5rem' }}>
      {isLoggedIn && (
        <>
        <div style={{marginLeft:'15rem'}}>    <a  style={{fontFamily:'Readex Pro Variable'} } className="btn text-white fs-5 m-2 my-sm-0" href="/trade" type="submit">
            Trade
          </a>
          <a style={{fontFamily:'Readex Pro Variable'} } className="btn text-white m-2 fs-5 fw-5 my-sm-0" href="/markets" type="submit">
            Markets
          </a></div>
      
        </>
      )}
      {isLoggedIn? (
        <>
       
          <div className="d-flex align-items-center "> 
            <Text fontFamily={'Readex Pro Variable'} as="span" color="white" fontWeight="bold" mr={2}>
            hi, {username.toUpperCase()}
          </Text>
            <Button leftIcon={<FiLogOut/>} className='rounded-pill' colorScheme="gray" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex align-items-center ms-auto">
            <Link to="/login">
              <Button as={'a'} className='mx-3' variant={'unstyled'} _hover={{ textColor: 'black' }}>
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button as={'a'} colorScheme="yellow"  className='rounded-pill signup'  _hover={{ textColor: 'black' }}>
                Sign Up
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  </div>
  );
}
