import React from 'react'
import {AppBar,Box,Toolbar,Typography,Button} from '@mui/material'
import { NavLink } from 'react-router-dom'
import { getToken } from '../services/LocalStorageService'

const Navbar = () => {

  const {access_token} = getToken()
  return (
    <>
    <Box sx={{flexGrow:1}}>
      <AppBar position="static" color='secondary'>
        <Toolbar>
          <Typography variant='h5' component="div" sx={{flexGrow:1}}>
            kalash shop
          </Typography>
          <Button component={NavLink} sx={{color:'white',textTransform:'none'}} style={({isActive})=>{return {backgroundColor:isActive?'#6d1b7b':''}}} to="/">Home</Button>
          <Button component={NavLink} sx={{color:'white',textTransform:'none'}} style={({isActive})=>{return {backgroundColor:isActive?'#6d1b7b':''}}} to="/contact">Contact Us</Button>

          { access_token ?<Button component={NavLink} sx={{color:'white',textTransform:'none'}} style={({isActive})=>{return {backgroundColor:isActive?'#6d1b7b':''}}} to="/dashboard">DashBoard</Button>
 :   <Button component={NavLink} sx={{color:'white',textTransform:'none'}} style={({isActive})=>{return {backgroundColor:isActive?'#6d1b7b':''}}} to="/login">Login/Registration</Button>
        }


        </Toolbar>

      </AppBar>
    </Box>
    
    
    </>
  )
}

export default Navbar