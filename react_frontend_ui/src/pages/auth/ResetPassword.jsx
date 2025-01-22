import React,{act, useState} from 'react'
import { TextField,Button,Box,Alert } from '@mui/material'
import {NavLink,useNavigate, useParams} from "react-router-dom";
import Grid from '@mui/material/Grid';
import { useResetPasswordMutation } from '../../services/userAuthApi';
const ResetPassword = () => {
    // const [error,SetError] = useState({
    //     status:false,
    //     msg:'',
    //     type:''
    //   })
    const [server_error,set_server_error] = useState({})
    const [server_msg,set_server_msg] = useState({})
    const [ResetPasswordMutation] = useResetPasswordMutation()
    const {id,token} = useParams()


      const navigate = useNavigate();
    
      const handleSubmit=async(e)=>{
        e.preventDefault();
    
    
        const data = new FormData(e.currentTarget)  //check documentation
        const actualData = {
        //   email : data.get('email'),
        password : data.get('password'),
        password2 : data.get('password2')
        }
        console.log(actualData)

        const res = await ResetPasswordMutation({actualData,id,token})
        console.log('thsi is actual data',actualData)
        if(res.error){
          console.log(res.error.data.errors)
          set_server_msg({})
          set_server_error(res.error.data.errors)
        }
        if(res.data){
          console.log(res.data)
          set_server_error({})
          set_server_msg(res.data)
          // console.log('data deleted nsuccessfilly')
          document.getElementById('password-reset-form').reset();

          setTimeout(()=>{
            navigate("/login")
          },3000)   //after 3 second
        }
          // set_serve
        //form validation
        // if(actualData.password && actualData.password2){
        //     if(actualData.password == actualData.password2){
        //         console.log(actualData)
        //         document.getElementById('password-reset-form').reset();
          
        //         SetError({status:true,msg:'your password has changed successfully..Redirecting to login page in a seconds',type:'success'})

        //         setTimeout(()=>{
        //             navigate('/login')
        //         },3000)    //3 sec
                
        //     }else{
        //         console.log('password not match')
        //         SetError({status:true,msg:'Password not match',type:'error'})
        //     }
        // //   navigate('/')   //that means navigate to home page
        // }else{
    
        //   console.log('no data')
        //   SetError({status:true,msg:'All fields are required',type:'error'})
    
        // }
    
    }
  return (
    <>

<Grid container justifyContent={'center'}>
        <Grid item sm={6} xs={12}>
            <h2>Reset password</h2>

    <Box component='form' noValidate sx={{mt:1}} id="password-reset-form" onSubmit={handleSubmit}>
          <TextField margin='normal' required fullWidth id='password' name='password' label="Enter your New password" />
          {server_error.password ? <Alert severity='error'>{server_error.password[0]}</Alert> :'' } 
          <TextField margin='normal' required fullWidth id='password2' name='password2' label="Confirm your New password" />
          {server_error.password2 ? <Alert severity='error'>{server_error.password2[0]}</Alert> :'' } 
          
          <Box textAlign='center'>
            <Button type='submit' variant='contained' sx={{mt:3,mb:2,px:5}}>Send</Button>
          </Box>


          {/* <NavLink to="/sendpasswordresetemail">Forgot password</NavLink> */}


          {/* </TextField> */}
          {/* {error.status ? <Alert severity={error.type}>{error.msg}</Alert> :'' } */}
          {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> :'' } 

          {server_msg.msg ? <Alert severity='success'>{server_msg.msg}</Alert> :'' }
          

        </Box>

        </Grid>

    </Grid>



    </>
  )
}

export default ResetPassword