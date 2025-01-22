import React,{useState} from 'react'
import { TextField,Button,Box,Alert,Checkbox ,Typography} from '@mui/material'
import {NavLink,useNavigate} from "react-router-dom";
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel'; 
import { useSelector } from 'react-redux';
import { useChangeUserPasswordMutation } from '../../services/userAuthApi';
// import Navbar from '../../Navbar';
import Navbar from '../../components/Navbar';
import { getToken, storeToken } from '../../services/LocalStorageService';

const ChangePassword = () => {
    // const [error,SetError] = useState({
    //     status:false,
    //     msg:'',
    //     type:''
    //   })
    
      const [server_error,set_server_error]= useState({})
      const [server_msg,set_server_msg]= useState({})
      const [redirectMsg, setRedirectMsg] = useState(false);
      const navigate = useNavigate();
      const [changeUserPassword] = useChangeUserPasswordMutation()
      const {access_token} = getToken()


      const handleSubmit=async(e)=>{
        e.preventDefault(); 
    
    
        const data = new FormData(e.currentTarget)  //check documentation
        const actualData = {

          password : data.get('password'),
          password2 : data.get('password2'),
          // tc: data.get('tc')
        }
        console.log('form data is showing',actualData)
        const res = await changeUserPassword({actualData,access_token})

        console.log('thsi is the actual data',res)

        if(res.error){
          set_server_msg({})
          set_server_error(res.error.data.errors)
        }
        if(res.data){
          console.log(res.data)
          set_server_error({})
          set_server_msg(res.data)
          console.log('data deleted nsuccessfilly')
          document.getElementById('Change-Password-form').reset();

          // navigate('/login')
          setRedirectMsg(true);
          setTimeout(() => {
              navigate('/login'); // Replace '/login' with the correct login route
          }, 3000);
          // set_server_msg("Password changed successfully!");
          // storeToken(res.data.token)
          
          // let {access_token} = getToken()
          // dispatchEvent(set_server_error({access_token:access_token}))
          // navigate('/dashboard')
        }


        
        //form validation
        // if(actualData.password && actualData.password2 && actualData.tc!==null){
        //     if (actualData.password == actualData.password2){
        //           console.log(actualData)     //for complete data validation
        //           document.getElementById('Change-Password-form').reset();
            
        //           server_error({status:true,msg:'Change-Password Success',type:'success'})
        //             navigate('/dashboard')   //that means navigate to home page

        //         }else{
                    
        //             server_error({status:true,msg:'password not match',type:'error'})
        //     }
        // }else{
    
        //   console.log('no data')
        //   set_server_error({status:true,msg:'All fields are required',type:'error'})
    
        // }
    
      }
      //GETTING USER DATA FROM REDUX STORE
      const myData = useSelector(state => state.user)
      console.log('change password',myData)
  return (
    <>
    <Navbar></Navbar>
    {/* {server_error.password ? console.log(server_error.password[0]) : ""} */}
    

    {/* {server_error.password ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.password[0]}</Typography>: "" } */}

    {/* {/* {server_error.non_field_errors ? console.log(server_error.non_field_errors[0]) : ""} */}
    {/* {server_error.password ? console.log(server_error.password[0]) : ""} */}


    <Box sx={{display:'flex' ,flexDirection:'column',flexWrap:'wrap',maxWidth:600,mx:4}}>
        <h3>Change password</h3>
    


    <Box component='form' noValidate sx={{mt:1}} id="Change-Password-form" onSubmit={handleSubmit}>

          <TextField margin='normal' required fullWidth id='password' name='password' label="password" type='passowrd' />
{server_error.password ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.password[0]}</Typography>: "" }


          <TextField margin='normal' required fullWidth id='cpassword' name='password2' label="Confirm your password" type='passowrd' />
          {server_error.password2 ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.password2[0]}</Typography>: "" }


          {/* <FormControlLabel control={<Checkbox value="agree" color='primary' name='tc' id='tc'/>} label='I agree the terms and condition'/> */}
          <Box textAlign='center'>
            <Button type='submit' variant='contained' sx={{mt:3,mb:2,px:5}}>Change password</Button>
          </Box>


          {/* <NavLink to="/">Forgot password</NavLink> */}


          {/* </TextField> */}
          {/* {error.status ? <Alert severity={error.type}>{error.msg}</Alert> :'' } */}

          {/* {server_error.non_field_errors ? console.log(server_error.non_field_errors[0]) : ""}
          {server_error.non_field_errors ? console.log(server_error.non_field_errors[0]) : ""} */}
          {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> :'' } 
          
          {server_msg.msg ?  <Alert severity='success'>{server_msg.msg[0]}</Alert>:""}
        </Box>
        </Box>
    
    </>
  )
}

export default ChangePassword