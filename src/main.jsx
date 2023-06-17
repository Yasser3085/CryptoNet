import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'

import '@fontsource/viga';



ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>

  <ChakraProvider >
    <App />
  </ChakraProvider>

  </Router>

)
