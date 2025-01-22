import React,{act, useState} from 'react'
import { TextField,Button,Box,Alert, Checkbox } from '@mui/material'
import {NavLink,useNavigate} from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel'; 
import Grid from '@mui/material/Grid';
// import Textarea from '@mui/joy/Textarea';

const Contact = () => {
  const [error,SetError] = useState({
    status:false,
    msg:'',
    type:''
  })

  const navigate = useNavigate();

  const handleSubmit=(e)=>{
    e.preventDefault();


    const data = new FormData(e.currentTarget)  //check documentation
    console.log('data :',data)
    const actualData = {
      name : data.get('name'),
      email : data.get('email'),
      phone : data.get('phone'),
      query : data.get('query'),
    //   password : data.get('password')
    }
    // console.log(actualData)
    const phoneRegex = /^[0-9]{10}$/;
    const nameRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{3,}$/; 
    const emailRegex =/^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/; // Valid email format

    //form validation
    if(actualData.name.trim()  &&  actualData.email.trim() && actualData.phone && actualData.query.trim()){
      console.log('all fields given')

      // if(actualData.name.trim()){
      //   console.log('sssssss',actualData.name)
      //   SetError({status:true,msg:'name cant be empty',type:'error'})
      // }
      // if(!emailRegex.test(actualData.email)){
      //   console.log(actualData.email)
      //   SetError({status:true,msg:'Enter a valid email address',type:'error'})
      // }
      if(!phoneRegex.test(actualData.phone)){
        console.log(actualData)
        // document.getElementById('contact-form').reset();
        SetError({status:true,msg:'mobile must be of 10 number',type:'error'})
      }
      // else{

      // }
      
      else{
        console.log('successfully done')
        // navigate('/')   //that means navigate to home page
        SetError({status:true,msg:'success sent your query to owner',type:'success'})
      }
    }else{

      console.log('no data')
      SetError({status:true,msg:'All fields are required',type:'error'})

    }

        // SetError({status:true,msg:'success sent your query to owner',type:'success'})

}
return (
<>

<Grid container justifyContent={'center'}>
    <Grid item sm={6} xs={12}>

<Box component='form' noValidate sx={{mt:1}} id="contact-form" onSubmit={handleSubmit}>
      <TextField margin='normal' required fullWidth id='name' name='name' label="Enter your Name" />
      <TextField margin='normal' required fullWidth id='email' name='email' label="Enter your Email address" />
      <TextField margin='normal' required fullWidth id='phone' name='phone' label="Enter your Mobile number" />
      <TextField margin='normal' required fullWidth id='desc' name='query' label="Your Query or Description" />
      {/* <TextField margin='normal' required fullWidth id='email' name='email' label="" /> */}
      
      <Box textAlign='center'>
        <Button type='submit' variant='contained' sx={{mt:3,mb:2,px:5}}>Contact us</Button>
      </Box>


      {/* <NavLink to="/sendpasswordresetemail">Forgot password</NavLink> */}


      {/* </TextField> */}
      {error.status ? <Alert severity={error.type}>{error.msg}</Alert> :'' }
      

    </Box>

    </Grid>

</Grid>



</>
)
}

export default Contact