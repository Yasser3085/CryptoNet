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
    
      
      
      w="100%"
      h={'50rem'}
      alignItems="center"
      justifyContent="center"
    className="parent"
    flexDirection={'column'}
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
      <Button size={"lg"} colorScheme="yellow" fontFamily={'Readex Pro Variable'} className="mt-5 btn rounded-pill getstarted"  >  Get Started </Button>
      </Link>

    
      </Flex>

      <div className="d-flex justify-content-center align-items-center w-100" style={{ marginTop: '5rem', fontSize: '3rem', fontFamily: 'Readex Pro Variable' }}>
  <div className="line" style={{ flex: 1,marginLeft:'15rem'}}>
    <hr />
  </div>
  <span style={{ margin: '0 1rem' }}> Main Goals </span>
  <div className="line " style={{ flex: 1 ,marginRight:'15rem' }}>
    <hr />
   
  </div>
 
</div>

<div className="mt-5 goals-div d-flex justify-content-center align-items-center "  style={{fontFamily:'Readex Pro Variable'}} >

  
 <div  style={{margin:"4rem" , display:'flex' , justifyContent:'center' , alignItems:'center', flexDirection:'column'}}>
 <img src="https://cdn-icons-png.flaticon.com/512/871/871645.png " width="60" height="60" alt="" title="" class="img-small"></img>
  <h1 className="mt-3">Security</h1></div> 
 <div  style={{margin:"4rem" , display:'flex' , justifyContent:'center' , alignItems:'center', flexDirection:'column'}}>
 <img src="   https://cdn-icons-png.flaticon.com/512/2229/2229638.png " width="60" height="60" alt="" title="" class="img-small"/>
  <h1 className="mt-3">Low Fees</h1></div> 
 
 <div  style={{margin:"4rem" , display:'flex' , justifyContent:'center' , alignItems:'center', flexDirection:'column'}}>
 
 <img src="   https://cdn-icons-png.flaticon.com/512/10635/10635178.png " width="60" height="60" alt="" title="" class="img-small"/><h1 className="mt-3" >Reliability</h1></div> 
 
 

  </div>
  
 


    </Flex>

  </>

   
  );
}

