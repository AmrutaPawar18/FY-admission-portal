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


///styles
const classes = {
  paper: {
    marginTop: 10,
      justifyContent: 'center',
      height: '70vh',
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
            lname:""
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePwd = this.onChangePwd.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeFname = this.onChangeFname.bind(this);
        this.onChangeLname = this.onChangeLname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
    }

    componentDidMount() {

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
                alert("Created account\t" + res.data.name+"\nPlease login to continue");
                console.log(res);
                this.setState({fname:"",lname:"", email:"", pwd:"", role:""})

            })
             .catch(err => {
                alert(err.error);
                console.log(err.error);
             })
             ;
   }

    render() {
        return (
            <Container component="main" maxWidth="xs">
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

