import React from 'react'
// import Navbar from '../Navbar'
import Navbar from '../components/Navbar'
// import Home from './Home'
import Home from './Home'
import Contact from './Contact'
import { Outlet } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
const Layout = () => {
  return (
    <>
    <CssBaseline/>   {/* cssbaseline is used for 0 margin and padding */}
    <Navbar/>
    {/* sadf */}
    <Outlet/>   {/* //it means render the child  */}
    {/* <Home/>
    <Contact/> */}
   {/* HOme page */}
    
    </>
  )
}

export default Layout