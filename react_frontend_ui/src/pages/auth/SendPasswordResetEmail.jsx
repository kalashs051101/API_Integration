import React,{useState} from 'react'
import { TextField,Button,Box,Alert ,Typography} from '@mui/material'
import {NavLink,useNavigate} from "react-router-dom";
import Grid from '@mui/material/Grid';
import { useSendPasswordResetEmailMutation } from '../../services/userAuthApi';
const SendPasswordResetEmail = () => {
    // const [error,SetError] = useState({
    //     status:false,
    //     msg:'',
    //     type:''
    //   })
    
      // const navigate = useNavigate();
      const [server_error,set_server_error] = useState({})
      const [server_msg,set_server_msg] = useState({})
      const [SendPasswordResetEmail] = useSendPasswordResetEmailMutation()


      const handleSubmit=async(e)=>{
        e.preventDefault();
    
    
        const data = new FormData(e.currentTarget)  //check documentation

        console.log('data :',data)

        const actualData = {
          email : data.get('email'),
        //   password : data.get('password')
        }

        console.log(actualData)

        // SendPasswordResetEmail = 
        const res = await SendPasswordResetEmail(actualData)
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
          document.getElementById('password-reset-email-form').reset();
          // set_server_msg("Password changed successfully!");
          // storeToken(res.data.token)
          
          // let {access_token} = getToken()
          // dispatchEvent(set_server_error({access_token:access_token}))
          // navigate('/dashboard')
        }
        //form validation
        // if(actualData.email){
        //   console.log(actualData)
        //   document.getElementById('password-reset-email-form').reset();
    
        //   SetError({status:true,msg:'password reset email sent check your email',type:'success'})
        // //   navigate('/')   //that means navigate to home page
        // }else{
    
        //   console.log('no data')
        //   SetError({status:true,msg:'Please provide an valid email',type:'error'})
    
        // }
    
    }
  return (
    <>

    <Grid container justifyContent={'center'}>
        <Grid item sm={6} xs={12}>

    <Box component='form' noValidate sx={{mt:1}} id="password-reset-email-form" onSubmit={handleSubmit}>
          <TextField margin='normal' required fullWidth id='email' name='email' label="Enter your Email address" />

          {server_error.email ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.email[0]}</Typography>: "" }


          
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

export default SendPasswordResetEmail