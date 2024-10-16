import React, {Component} from 'react';
import im from '../static/bk9.png';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { GoogleLogin } from 'react-google-login';

import axios from 'axios';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        Headless Hunt
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const classes = {
    paper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '70vh',
      alignItems: 'center',
      alignContent: 'center'
    },
    avatar: {
      margin: 10,
      alignSelf: 'center',
      backgroundColor: 'red',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: 1,
    },
    submit: {
      marginBottom: 10
    },
  };
  
export default class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            pwd:''
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePwd = this.onChangePwd.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.googleSuccess = this.googleSuccess.bind(this);
        this.googleError = this.googleError.bind(this);
    }

    async componentDidMount() {
      /*var tok = localStorage.getItem('token');
      var ck = false;
      var config = {
          headers: {
            'Content-type': 'application/json'
          }
        }

        // If token, add to headers
        if (tok) {
          config.headers['auth-tok'] = tok;
        }
        await axios.get('http://localhost:5000/user', config)
             .then(res => {
              if(res.data.check){
                ck = true;
                localStorage.setItem('role', res.data.role)
              }
            })
             .catch(err=>{
              if(err.response){
                if(err.response.data.error)
                  console.log(err.response.data.error)
                else
                  console.log(err.message);
              }
              else
                console.log(err.message);
             });

      if(ck){
        if(tok){
          var role = localStorage.getItem('role');
          console.log(role)
          if(role==='Applicant'){
            console.log("Applicant")
            this.props.history.push('/aDashboard');
          }
          else if(role === 'Admin')
            this.props.history.push('/rDashboard');

        }
      }*/

    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePwd(event) {
        this.setState({ pwd: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/user/login', {email:this.state.email, password:this.state.pwd})
             .then(res => {alert("Welcome\t" + res.data.name);
                localStorage.setItem('token', res.data.token);
                var role = res.data.role;
                localStorage.setItem('role', role);
                if(role==='Applicant')
                  this.props.history.push('/applHome');
                else if(role === 'Admin')
                  this.props.history.push('/adminDashboard');
              })
             .catch(err => {
                if(err.response){
                    if(err.response.data.error)
                      alert(err.response.data.error)
                    else
                      alert(err.message);
                  }
                  
                  else
                    alert(err.message);  
             })
             ;
    }

    async googleSuccess(resp){
      console.log(resp);
      axios.post('http://localhost:5000/user/login', {email:resp.profileObj.email, password:resp.googleId})
         .then(res => {alert("Welcome\t" + res.data.name);
            localStorage.setItem('token', res.data.token);
            var role = res.data.role;
            localStorage.setItem('role', role);
            if(role==='Applicant')
              this.props.history.push('/applHome');
            else if(role === 'Admin')
              this.props.history.push('/adminDashboard');
          })
         .catch(err => {
            if(err.response){
                if(err.response.data.error)
                  alert(err.response.data.error)
                else
                  alert(err.message);
              }
              
              else
                alert(err.message);  
         })
         ;
    }
    googleError(e){
      console.log(e);
    }

render() {

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div style={classes.paper}>
      
        <Avatar style={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" >
          Sign in
        </Typography>
        
        <form style={classes.form} onSubmit={this.onSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={this.state.email}
            onChange={this.onChangeEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={this.state.pwd}
            onChange={this.onChangePwd}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>

          <Grid container style={{paddingTop:10}}>
            <Grid item xs>
              <GoogleLogin
            clientId="531568689114-5rg3ebcc6ciphbv6ged7m54lbj0gine5.apps.googleusercontent.com"
            
            onSuccess={this.googleSuccess}
            onFailure={this.googleError}
            cookiePolicy="single_host_origin"
          />
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={7}>
        <Copyright />
      </Box>
    </Container>
  );
}
}


    // render(){
    //     return(
            
    //             <Container>
    //                 <img
    //                     src={im}
    //                     alt="Job application portal"
    //                 />
    //                 <div>
    //                     <Button href="/register">Register</Button>
    //                 </div>
    //             </Container>
            
    //     )
    // }

    /*render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.pwd}
                               onChange={this.onChangePwd}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                        <Button  href="/register">Register</Button>
                    </div>
                </form>
           </div>
        )
    }*/
