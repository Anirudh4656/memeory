import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { signin ,signup} from '../../actions/auth';
import Icon from './icon';
import Input from './Input';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
const Auth = () => {
    const classes = useStyles();
    const history= useHistory();
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
    const [isSignup, setIsSignup] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
          dispatch(signup(form,history))
        }else{
          dispatch(signin(form,history))
        }
    }
    const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        // setForm({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
        setIsSignup((prevIsSignup) => !prevIsSignup);
        // setShowPassword(false);
      };
      const dispatch =useDispatch();
      const googleSuccess=async(res)=>{
      
        console.log(res);
        const result = res?.profileObj;
        const token = res?.tokenId;
        
    try {
      dispatch({ type: "AUTH", data: { result, token } });
    history.push("/")
    } catch (error) {
      console.log(error);
    }
        
      }
      const googleError=()=>{
        console.log("errror in log in");

      }

      const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    return (
        <Container component="main" maxWidth="xs">
          <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                { isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
                )}
                <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                { isSignup ? 'Sign Up' : 'Sign In' }
              </Button>
              <GoogleLogin
                clientId="557048079781-2d42m7jhcsaj8fvvesokujus3rln7rk5.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                    Google Sign In
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy="single_host_origin"
              />
              <Grid container justify="flex-end">
                <Grid item>
                  <Button onClick={switchMode}>
                    { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      );
    };
export default Auth