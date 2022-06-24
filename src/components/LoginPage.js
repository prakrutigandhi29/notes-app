import { Button, Card, CardContent, CardHeader, Checkbox, Container, CssBaseline, Divider, FormControl, FormControlLabel, Grid, IconButton, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
function Login() {
  const usestyles=makeStyles({
    root:{
      backgroundColor:'#f9f9f9',
      
    },
    card:{
      marginTop:'10%',
      width:'30%',
      display:'block',
      textAlign:'center'
    },
    
   })
  const classes=usestyles();
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <div className={classes.root}>
     <Grid
     container
     spacing={0}
     direction="column"
     alignItems="center"
     justify="center"
     style={{ minHeight: '100vh' }}
   >
       <Card elevation={1} className={classes.card}>
         <CardHeader title="LOGIN"/>
         <CardContent>
           <form>
         <TextField className={classes.field}
          label="Email" 
          type="email"
          variant="outlined" 
          color="secondary" 
          fullWidth
          required
        />
        <br></br><br></br>
        <TextField className={classes.field}
          label="Password"
          type="password"
          variant="outlined"
          color="secondary"
          required
          fullWidth
        />
        <FormControl>
        <FormControlLabel control={<Checkbox {...label} defaultChecked color="secondary"/>} label="Remember me" />
        </FormControl>
        <br></br><br/>
        <Button
          type="submit" 
          color="secondary" 
          variant="contained"
          fullWidth
        >
        LOGIN
        </Button> 
        <Typography textAlign={"right"} color="gray">Forgot Password?</Typography><br></br>
    <Divider>OR, Continue with</Divider>
    <br></br>
        </form>
        <div>
    <IconButton><GoogleIcon style={{color:'#db4a39'}}/></IconButton>&nbsp;
    <IconButton><FacebookOutlinedIcon style={{color:'#4267B2'}}/></IconButton>&nbsp;
    <IconButton><LinkedInIcon style={{color:'#0077b5'}}/></IconButton>
     </div><br></br>
    <Typography color={'gray'}>Don't have an Account? <a href='#' style={{color:'gray'}}>Sign UP</a></Typography>
         </CardContent>
       </Card>
     </Grid>
    </div>
  )
}

export default Login
