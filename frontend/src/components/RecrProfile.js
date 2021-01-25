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
        Your Website
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
            email:'',
            fname:'',
            lname:'',
            bio:'',
            contact:'',
            edit:false
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
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

        await axios.get('http://localhost:5000/recr/profile', config)
             .then(res => {
              console.log(res.data);
              this.setState({
                fname: res.data.user_id.fname,
                lname: res.data.user_id.lname,
                email: res.data.user_id.email,
                contact: res.data.contact,
                bio: res.data.bio
              })
            })
             .catch(err=>{
              if(err.response){
                if(err.response.data.error)
                  alert(err.response.data.error)
                else
                  alert(err.message);

              }
              else
                alert(err.message);
              this.props.history.push('/')
             });

    }

    onInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async onSubmit(e) {
      e.preventDefault();
      if(!this.state.edit)
        this.setState({edit:true});
      else{
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

          var prof = this.state;
          delete prof.edit;
          console.log(prof);
          var c=0;
          await axios.patch('http://localhost:5000/user/updateDetails', {lname:this.state.lname,fname:this.state.fname}, config)
               .then(res => {
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
                  c=1;
               });
          if(c) return;
          axios.patch('http://localhost:5000/recr/updateProfile', prof, config)
               .then(res => {
                  alert("Updated");
                  this.setState({edit:false})
                })
               .catch(err => {
                  if(err.response){
                    if(err.response.data.error)
                      console.log(err.response.data.error)
                    else
                      console.log(err.message);
                  }
                  
                  else
                    console.log(err.message);             
               });
          
        }
    }

render() {

  return (
    <Container component="main">
      <CssBaseline/>
      <Paper style={classes.paper}>
      
        <Typography component="h1" variant="h5" >
          Profile
        </Typography>
        
        <form style={classes.form} noValidate onSubmit={this.onSubmit}>
          <Grid container spacing={2} style={{padding:10}}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="fname"
                variant="outlined"
                required
                fullWidth
                id="fname"
                label="First Name"
                autoFocus
                value={this.state.fname}
                onChange={this.onInputChange}
                InputProps = {{
                  readOnly: !this.state.edit
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lname"
                label="Last Name"
                name="lname"
                value={this.state.lname}
                onChange={this.onInputChange}
                InputProps = {{
                  readOnly: !this.state.edit
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={this.state.email}
                onChange={this.onInputChange}
                InputProps = {{
                  readOnly: true
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="contact"
                label="Contact number"
                name="contact"
                value={this.state.contact}
                onChange={this.onInputChange}InputProps = {{
                  readOnly: !this.state.edit
                }}
              />
              </Grid>
              <Grid item xs={12}>
              <TextField 
                variant="outlined"
                required
                fullWidth
                multiline
                rows={4}
                name="bio"
                label="Bio (max 250 words)"
                id="bio"
                value={this.state.bio}
                onChange={this.onInputChange}
                InputProps = {{
                  readOnly: !this.state.edit
                }}
              />
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={classes.submit}
          >
          {this.state.edit?"Update":"Edit"}
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
