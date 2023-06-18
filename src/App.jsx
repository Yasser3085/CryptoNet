import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '@fontsource-variable/outfit'; 
import Navbar from './comp/Navbar';
import { Text} from "@chakra-ui/react"
import {BrowserRouter as Router, Route, Routes , Link} from 'react-router-dom'
import GetStarted from './comp/GetStarted'
import Home from './comp/Home'
import SignUp from './comp/SignUp';
import Login from './comp/Login';
import Markets from './comp/Markets';
import Footer from './comp/Footer';
import TradePage from './comp/TradePage';
function App() {
 

  return (
    <>
    <Navbar/>
     

  
<Routes>

<Route path='/'  element={<GetStarted/>} />
<Route path='/home'  element={<Home/>} />
<Route path='/signup' element={<SignUp/>} />
<Route path='/login' element={<Login/>} />
<Route path='/markets' element={<Markets/>} />
<Route path='/trade' element={<TradePage/>} />







</Routes>
<Footer/>

    </>
  )
}

export default App
