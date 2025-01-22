import React, { useEffect, useState } from 'react'
import { TextField,Button,Box,Alert,Typography } from '@mui/material'
import {NavLink,useNavigate} from "react-router-dom";
import { useLoginUserMutation } from '../../services/userAuthApi';
import { storeToken } from '../../services/LocalStorageService';
import { useDispatch } from 'react-redux';
import { SetUserToken } from '../../features/authSlice';
import { getToken } from '../../services/LocalStorageService';
const UserLogin = () => {
  const [login_error,set_login_error] = useState({})
  // const [error,SetError] = useState({
  //   status:false,
  //   msg:'',
  //   type:''
  // })

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [userLogin,{isLoading,isError}] = useLoginUserMutation();
  const handleSubmit=async (e)=>{
    e.preventDefault();



    const data = new FormData(e.currentTarget)  //check documentation
    const actualData = {
      email : data.get('email'),
      password : data.get('password')
    }
    console.log('this is actual data',actualData)

    const res = await userLogin(actualData) 
    
    console.log('res ---->  ',res)
    // if(res.error){
    //   // console.log(res.error)
    //   console.log("Error response: ", res.error); // log full error response
    //   console.log("Error data: ", res.error.data); // log error data

    //   // set_server_error(res.error.data.errors)
    //   set_login_error(res.error.data.errors);
    // } 

    if (res.error) {
      console.log("Error response: ", res.error); // log full error response
      console.log("Error data: ", res.error.data); // log error data
      set_login_error(res.error.data.errors); // Update this logic based on actual API response
    }

    if(res.data){
      console.log(res.data)
      storeToken(res.data.token)
      let {access_token}=getToken()
      dispatch(SetUserToken({access_token:access_token}))

      console.log("Successful response data: ", res.data);
      navigate('/dashboard')
    }



    //form validation
    // if(actualData.email && actualData.password){
    //   console.log(actualData)
    //   document.getElementById('login-form').reset();

    //   SetError({status:true,msg:'Login Success',type:'success'})
    //   navigate('/dashboard')   //that means navigate to home 
    // }else{

    //   console.log('no data')
    //   SetError({status:true,msg:'All fields are required',type:'error'})

    // }

  }

  let {access_token}=getToken()
  useEffect(() => {
    dispatch(SetUserToken({access_token:access_token}))
  },[access_token,dispatch])
  //if user refresh then it also set token in backend
  return (
    <div>

{login_error.email ? console.log(login_error.email[0]) : ""}

             {/* <h3>UserLogin page</h3> */}
        <Box component='form' noValidate sx={{mt:1}} id="login-form" onSubmit={handleSubmit}>
          <TextField margin='normal' required fullWidth id='email' name='email' label="Enter your email address" />
          {login_error.email ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{login_error.email[0]}</Typography>: "" }


          <TextField margin='normal' required fullWidth id='password' name='password' label="password" type='passowrd' />
          {login_error.password ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{login_error.password[0]}</Typography>: "" }


          {login_error.non_field_errors ? <Alert severity='error'>{login_error.non_field_errors[0]}</Alert> :'' } 
          


          <Box textAlign='center'>
            <Button type='submit' variant='contained' sx={{mt:3,mb:2,px:5}}>Login</Button>
          </Box>


          <NavLink to="/sendpasswordresetemail">Forgot password</NavLink>


          {/* </TextField> */}
          {/* {error.status ? <Alert severity={error.type}>{error.msg}</Alert> :'' } */}
          {/* {login_error.non_field_errors ? <Alert severity='error'>{login_error.non_field_errors[0]}</Alert> :'' }  */}
          


        </Box>
    </div>
  )
}

export default UserLogin