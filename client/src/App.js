import React from 'react'
import { BrowserRouter, Route,Routes } from "react-router-dom"

import Home from './component/Home';
import Navbar from './component/Navbar';
import Register from './component/Register';
import Update from './component/Update';
const App = () => {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route  path="/" element={ <Home /> } />
          <Route path='/register' element={<Register />} />
          <Route path='/update/:id' element={<Update />} />
  
          

        </Routes>
      
    </BrowserRouter>
  )
}

export default App