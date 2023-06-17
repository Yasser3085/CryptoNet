import React from "react";
import { chakra, Box, Stack, Flex,Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import  '../App.css'

import '@fontsource/crete-round';
export default function GetStarted(){
  return (
  <>
  
  
    
    <Flex
    
      p={50}
      
      w="full"
      h={'90vh'}
      alignItems="center"
      justifyContent="center"
    className="parent"
    >
      <Flex  justify="center"  alignItems={'center'} direction={'column'} _dark={{ }} w="full">
      <h1 style={{fontFamily:'Crete Round'}}> 
"Welcome to our cryptocurrency platform" 

</h1>
      <h1 style={{fontFamily:'Crete Round'}}> 
      where innovation meets financial freedom.

</h1>
      <Link  to='/signup' >
      <Button colorScheme="yellow">  Get Started </Button>
      </Link>

    
      </Flex>
    </Flex>
  </>

   
  );
}

