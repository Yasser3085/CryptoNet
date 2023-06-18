import React from "react";
import { chakra, Box, Stack, Flex,Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import  '../App.css'

import '@fontsource-variable/readex-pro';
import '@fontsource/crete-round';
export default function GetStarted(){
  return (
  <>
  
  
    
    <Flex
    
      p={50}
      
      w="full"
      h={'90vh'}
      alignItems="start"
      justifyContent="center"
    className="parent"
    >
      <Flex className="mt-5"  justify="center"  alignItems={'center'} direction={'column'} _dark={{ }} w="full">
      <h4 className="header" style={{fontFamily:'Readex Pro Variable'}}> 
CRYPTOCURRENCY PLATFORM 

</h4>


      <h1 style={{fontFamily:'Readex Pro Variable' , fontSize:'3.5rem'}}> 
"Welcome to our cryptocurrency platform" 

</h1>
      <h1 style={{fontFamily:'Readex Pro Variable'}}> 
      where innovation meets financial freedom.

</h1>
      <Link  to='/signup' >
      <Button size={"lg"} colorScheme="yellow" fontFamily={'Readex Pro Variable'} className="mt-5 btn rounded-pill"  >  Get Started </Button>
      </Link>

    
      </Flex>

    </Flex>


  </>

   
  );
}

