import React,{useState} from 'react'
import { TextField,Button,Box,Alert, Checkbox, Typography } from '@mui/material'
import {NavLink,useNavigate} from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel'; 
import { useRegisterUserMutation } from '../../services/userAuthApi';
import { storeToken } from '../../services/LocalStorageService';

const Registration = () => {

  const [server_error, set_server_error] = useState({})

    // const [error,SetError] = useState({
    //     status:false,
    //     msg:'',
    //     type:''
    //   })
    
      const navigate = useNavigate();
      const [registerUser,{isLoading,isError}] =useRegisterUserMutation()    //it provide isSuccess also
    
      const handleSubmit=async(e)=>{
        e.preventDefault();
    
    
        const data = new FormData(e.currentTarget)  //check documentation
        const actualData = {
          name : data.get('name'),
          email : data.get('email'),
          password : data.get('password'),
          password2 : data.get('password2'),
          tc: data.get('tc')
        }

        // if (actualData.password !== actualData.password2) {
        //   set_server_error({ general: ["Passwords do not match."] });
        //   return; // Prevent API call if passwords don't match
        //   console.log()
        // }
        const res = await registerUser(actualData)     //for api

        console.log('this res :  :  : ',res)
        // console.log(res)
        // console.log(actualData)
        if(res.error){
          // console.log(res.error)
          console.log("Error response: ", res.error); // log full error response
          console.log("Error data: ", res.error.data); // log error data

          // set_server_error(res.error.data.errors)
          set_server_error(res.error.data.errors);
        }
        if(res.data){
          // console.log(res.data)
          storeToken(res.data.token)   //store token in localStorage
          console.log("Successful response data: ", res.data);
          document.getElementById('registration-form').reset();
          navigate('/login')
        }
        
        //form validation
        // if(actualData.name && actualData.email && actualData.password && actualData.tc!==null){
        //     if (actualData.password == actualData.password2){
        //           console.log(actualData)     //for complete data validation
        //           document.getElementById('registration-form').reset();
            
        //           SetError({status:true,msg:'Registration Success',type:'success'})
        //             navigate('/dashboard')   //that means navigate to home page

        //         }else{
                    
        //             SetError({status:true,msg:'password not match',type:'error'})
        //     }
        // }else{
    
        //   console.log('no data')
        //   SetError({status:true,msg:'All fields are required',type:'error'})
    
        // }
    
      };
  return (
    <>
    {/* {server_error.name ? console.log(server_error.name[0]) : ""}
    {server_error.email ? console.log(server_error.email[0]) : ""}
    {server_error.password ? console.log(server_error.password[0]) : ""}
    {server_error.password2 ? console.log(server_error.password2[0]) : ""}
    {server_error.tc ? console.log(server_error.tc[0]) : ""}
    {server_error.non_field_errors ? console.log(server_error.non_field_errors[0]) : ""} */}
    

    <Box component='form' noValidate sx={{mt:1}} id="registration-form" onSubmit={handleSubmit}>

          <TextField margin='normal' required fullWidth id='name' name='name' label="Enter your name" />
          {server_error.name ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.name[0]}</Typography>: "" }

          <TextField margin='normal' required fullWidth id='email' name='email' label="email address" />
          {server_error.email ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.email[0]}</Typography>: "" }

          <TextField margin='normal' required fullWidth id='password' name='password' label="password" type='passowrd' />
          {server_error.password ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.password[0]}</Typography>: "" }

          <TextField margin='normal' required fullWidth id='cpassword' name='password2' label="Confirm your password" type='passowrd' />
          {server_error.password2 ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.password2[0]}</Typography>: "" }

          <FormControlLabel control={<Checkbox value={true} color='primary' name='tc' id='tc'/>} label='I agree the terms and condition'/>

          {server_error.tc ? <span style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.tc[0]}</span>: "" }     {/* //for showing the errors */}

          <Box textAlign='center'>
            <Button type='submit' variant='contained' sx={{mt:3,mb:2,px:5}} disabled={isLoading}>  {isLoading ? 'Registering...' : 'Register'}</Button>
          </Box>

          {/* <NavLink to="/">Forgot password</NavLink> */}

          {/* </TextField> */}
          {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> :'' } 
          

        </Box>
    
    </>
  )
}

export default Registration