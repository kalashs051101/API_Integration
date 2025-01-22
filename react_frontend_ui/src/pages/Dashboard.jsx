import React, { useEffect, useState } from 'react'
import { Button,CssBaseline,Typography,Grid, } from '@mui/material'
import { Navigate, useNavigate } from 'react-router-dom'
import ChangePassword from './auth/ChangePassword'
import { getToken, removeToken } from '../services/LocalStorageService'
import { useDispatch } from 'react-redux'
import { UnSetUserToken } from '../features/authSlice'
import { useGetLoggedUserQuery } from '../services/userAuthApi'
import { SetUserInfo, UnSetUserInfo } from '../features/userSlice'


const Dashboard = () => {
    let handleLogout=()=>{
        console.log('clicked logout')
        dispatch(UnSetUserInfo({name:"",email:""}))
        dispatch(UnSetUserToken({access_token:null}))
        removeToken()         //after logout it helps to delete the token
        navigate('/login')

    }
    const {access_token} = getToken()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {data,isSuccess} = useGetLoggedUserQuery(access_token);
    console.log('your data is here', data)


    const [userData,SetUserData] = useState({
        name:'',
        email:''
    })

    useEffect(() => {        //store user data in local state
      if (data && isSuccess){
        SetUserData({
            name:data.name,
            email:data.email
        })
      }
    }, [data,isSuccess])

    // const dispatch = useDispatch();
    useEffect(() => {
      if (data && isSuccess){
        dispatch(SetUserInfo({
            email:data.email,
            name:data.name
        }))
      }
    }, [data,isSuccess,dispatch])
    

    
    
  return (
    <>
    {/* Dashboard */}
    <CssBaseline/>
    <Grid container>
        <Grid item sm={4} sx={{backgroundColor:'green',p:3,color:'white'}}>
            <h2>DashBoard</h2>
            <Typography variant='h5'>Name : {userData.name}</Typography>
            <Typography variant='h5'>Email : {userData.email}</Typography>

            <Button variant='contained' color='warning' size='large' onClick={handleLogout} sx={{mt:8}}>Logout</Button>
        </Grid>
        <Grid item sm={8} >
            <ChangePassword/>

        </Grid>
    </Grid>


    </>
  )
}

export default Dashboard