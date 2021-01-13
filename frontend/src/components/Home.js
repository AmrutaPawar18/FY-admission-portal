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

import axios from 'axios';

/**/

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        Your Website
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
  
export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            pwd:''
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePwd = this.onChangePwd.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {

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
                console.log(res)})
             .catch(err => {
                console.log(err)
             })
             ;
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
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
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
