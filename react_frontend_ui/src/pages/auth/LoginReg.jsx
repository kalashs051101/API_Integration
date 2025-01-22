import React, { useState } from 'react'
import {Card,Typography,Tabs,Tab,Box} from '@mui/material'
// import Pic1 from '../../images/pic1.svg'
import Pic1 from '../../components/images/pic1.svg'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Grid from '@mui/material/Grid';
import UserLogin from './UserLogin';
import Registration from './Registration';
// import { useState } from 'react';
const TabPanel=(props)=>{
    const {children,value,index} =props;
    return(
        <div role='tabpanel' hidden={value !== index}>
            {
                value == index && (
                    <Box>{children}</Box>
                )
            }

        </div>
    )
}


const LoginReg = () => {

    const [value,setValue] = useState(0)
    const handleChange=(event,newValue)=>{
        setValue(newValue)
    }

    // console.log(Pic1)

  return (
    <>
    {/* <h3>Login and Reg</h3>
     */}
    <Grid container sx={{height:'90vh'}}>
    <Grid item lg={7} sm={6} sx={{
    // border: '1px solid red', // Debugging aid
    backgroundImage: `url(${Pic1})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display:{xs:'none',sm:'block'}
  }}
>
    </Grid>
    <Grid item lg={5} sm={7} sx={{ }}>
        <Card sx={{width:'100%',height:'100%'}}>
            <Box sx={{mx:3 ,height:400 }}>
                <Box sx={{borderBottom:1,borderColor:'divider'}}>
                    <Tabs value={value} textColor='secondary' indicatorColor='secondary' onChange={handleChange}>

                        <Tab label='Login' sx={{textTransform:'none',fontWeight:'bold'}}></Tab>
                        <Tab label='Registeration' sx={{textTransform:'none',fontWeight:'bold'}}></Tab>

                    </Tabs>

                    <TabPanel value={value} index={0}>
                        <UserLogin/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Registration/>
                    </TabPanel>

                </Box>

            </Box>

            {/* <Box textAlign='center' sx={{mt:2}}>
                <ShoppingBagIcon variant="h6" sx={{color: 'purple',fontsize:1000 }}/>
                <Typography variant='h4' sx={{fontWeight:'bold'}}>
                    ksdjfal
                </Typography>
            </Box> */}
        </Card>
    </Grid>

    </Grid>
    </>
  )
}

export default LoginReg