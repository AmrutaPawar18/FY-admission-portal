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
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import axios from 'axios';

/**/

var hi = []

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
      padding:'5%', 
      justifyContent:'center', 
      alignItems:'center', 
      display:'flex', 
      flexDirection:'column', 
      marginTop:'10%'    
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
            contact:'',
            bio:''
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
      
    }

    onInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(e) {

        e.preventDefault();
        var arr = this.state.bio.split(' ');
      if(arr.length>250){
        alert("Bio exceeded 250 words!");
        return;
      }

        var token = localStorage.getItem('token');
        // Headers
        var config = {
          headers: {
            'Content-type': 'application/json'
          }
        }

        // If token, add to headers
        if (token) {
          config.headers['auth-tok'] = token;
        }
        var data = this.state;
        axios.post('http://localhost:5000/recr/newProfile', data, config)
             .then(res => {
                alert("Profile created!");
                
                this.props.history.push('/rDashboard');
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

render() {

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline/>
      <Paper style={classes.paper}>
      
        <Typography component="h1" variant="h5" style={{marginBottom:10}}>
          Profile
        </Typography>
        
        <form style={classes.form} onSubmit={this.onSubmit} noValidate>
          You must fill this form to continue
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="contact"
            label="Contact number"
            name="contact"
            autoFocus
            value={this.state.contact}
            onChange={this.onInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            name="bio"
            label="Bio (max 250 words)"
            id="bio"
            value={this.state.bio}
            onChange={this.onInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Create profile
          </Button>
        </form>
      </Paper>
      <Box mt={7}>
        <Copyright />
      </Box>
    </Container>
  );
}
}

