import React, {Component} from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { GoogleLogin } from 'react-google-login';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


///styles
const classes = {
  paper: {
    marginTop: 10,
      justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: 10,
    backgroundColor: 'red',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 3,
  },
  submit: {
    margin: 3,
    marginTop: 15,
    marginBottom: 15,
  },
};

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            pwd:'',
            email: '',
            role:"",
            fname:"",
            lname:"",
            open:false,
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePwd = this.onChangePwd.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeFname = this.onChangeFname.bind(this);
        this.onChangeLname = this.onChangeLname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.googleSuccess = this.googleSuccess.bind(this);
        this.googleError = this.googleError.bind(this);
    }

    componentDidMount() {
     /* var tok = localStorage.getItem('token');

      if(tok){
        var role = localStorage.getItem('role');
        if(role==='Applicant')
          this.props.history.push('/aDashboard');
        else if(role === 'Recruiter')
          this.props.history.push('/rDashboard');

      }*/
    }

    onChangeUsername(event) {
        this.setState({ name: event.target.value });
    }
    onChangeFname(event) {
        this.setState({ fname: event.target.value });
    }
    onChangeLname(event) {
        this.setState({ lname: event.target.value });
    }
    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePwd(event) {
        this.setState({ pwd: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
            password: this.state.pwd,
            date_of_reg: Date.now(),
            role: this.state.role
        }
        console.log(newUser);

        axios.post('http://localhost:5000/user/register', newUser)
             .then(res => {
                alert("Created basic account for " + res.data.name+". Please continue to complete your profile"); 
                localStorage.setItem('token', res.data.token);
                var role = res.data.role;
                localStorage.setItem('role', role);
                if(role==='Applicant')
                  this.props.history.push('/acreateProfile');
                else if(role === 'Recruiter')
                  this.props.history.push('/rcreateProfile');
                console.log(res);
                this.setState({fname:"",lname:"", email:"", pwd:"", role:""})

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
     // console.log(resp);
      const newUser = {
            fname: resp.profileObj.givenName,
            lname: resp.profileObj.familyName,
            email: resp.profileObj.email,
            password: resp.profileObj.googleId,
            date_of_reg: Date.now(),
            role: this.state.role
        }
        console.log(newUser);

        axios.post('http://localhost:5000/user/register', newUser)
             .then(res => {
                alert("Created basic account for " + res.data.name+". Please continue to complete your profile"); 
                localStorage.setItem('token', res.data.token);
                var role = res.data.role;
                localStorage.setItem('role', role);
                if(role==='Applicant')
                  this.props.history.push('/acreateProfile');
                else if(role === 'Recruiter')
                  this.props.history.push('/rcreateProfile');
                console.log(res);
                this.setState({fname:"",lname:"", email:"", pwd:"", role:"",open:false})

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

            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Education</DialogTitle>
                <DialogContent>
                  <Grid container spacing={2}>
                  <Grid item xs={12}>
                  <FormControl variant="outlined" required fullWidth>
                <InputLabel id="select-label">Role</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  value={this.state.role}
                  onChange={(e)=>this.setState({role: e.target.value})}
                  label="Role"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Applicant"}>Applicant</MenuItem>
                  <MenuItem value={"Recruiter"}>Recruiter</MenuItem>
                </Select>
              </FormControl>
                  </Grid>
                 
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={()=>this.setState({open:false})} color="primary">
                    Cancel
                  </Button>
                  <GoogleLogin
                    clientId="531568689114-5rg3ebcc6ciphbv6ged7m54lbj0gine5.apps.googleusercontent.com"
                    
                    onSuccess={this.googleSuccess}
                    onFailure={this.googleError}
                    cookiePolicy="single_host_origin"
                  />
                </DialogActions>
              </Dialog>

      <CssBaseline />
      <div style={classes.paper}>
        <Avatar style={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form style={classes.form} noValidate onSubmit={this.onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={this.state.fname}
                onChange={this.onChangeFname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={this.state.lname}
                onChange={this.onChangeLname}
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
                onChange={this.onChangeEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" required fullWidth>
                <InputLabel id="select-label">Role</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  value={this.state.role}
                  onChange={(e)=>this.setState({role: e.target.value})}
                  label="Role"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Applicant"}>Applicant</MenuItem>
                  <MenuItem value={"Recruiter"}>Recruiter</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={classes.submit}
          >
            Sign Up
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={classes.submit}
            onClick={(e)=>this.setState({open:true})}
          >
            Sign up with Google
          </Button>
          
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
           
           </Container>
        )
    }
}

