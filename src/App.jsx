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
import Markets from './comp/markets';
import Footer from './comp/Footer';
import TradePage from './comp/TradePage';
import TransactionDetails from './comp/TransactionDetails';
import Admin from './comp/Admin';
function App() {
 

  return (
    <>
    <Router>

   
    <Navbar/>
     

  
<Routes>

<Route path='/'  element={<GetStarted/>} />
<Route path='/home'  element={<Home/>} />
<Route path='/signup' element={<SignUp/>} />
<Route path='/login' element={<Login/>} />
<Route path='/markets' element={<Markets/>} />
<Route path='/trade' element={<TradePage/>} />
<Route path='/transaction/:hash' element={<TransactionDetails/>}/>
<Route path='/admin' element={<Admin/>}></Route>







</Routes>
<Footer/>
</Router>
    </>
  )
}

export default App
