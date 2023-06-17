import React from 'react';
import '../App.css';
import { Button , Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import '@fontsource/viga';

import {FaEthereum} from 'react-icons/fa' ; 

export default function Navbar() {
  return (
    <div>
      <div className=" p-4  d-flex justify-content-between navbar navbar-expand-lg navbar-dark navbar">
       
       <div className='d-flex'>
        <FaEthereum color={'#FAEF88'} size={40} />
        <Link   to='/home' className='link' >
        <Text   as={'h1'} fontSize={'4xl'} fontFamily={'Viga'}> CryptoNet </Text>
        </Link>
        
        </div> 
     

    
<div>

  <a
          className="btn text-white  m2 my-sm-0"
          href="/trade"
          type="submit"
        >
          Trade
        </a>
  <a
          className="btn text-white  m-2 my-sm-0"
          href="/markets"
          type="submit"
        >
          Markets
        </a>
  <a
          className="btn text-white  m-2 my-sm-0"
          href="/login"
          type="submit"
        >
          Login
        </a>
        <Link to='/signup'>
          <Button as={'a'} colorScheme='yellow' _hover={{textColor:'black'}}  > Sign Up</Button>
        </Link>
     

</div>
      
      </div>
    </div>
  );
}
