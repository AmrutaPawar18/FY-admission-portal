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
            title:'',
            maxAppl:0,
            maxPos:0,
            date:'',
            time:'',
            duration:0,
            type:'',
            salary:0,
            skills: '',
            email: '',
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
        const newJob = {
            
            email: this.state.email,
            title: this.state.title,
            maxPos: this.state.maxPos,
            maxAppl: this.state.maxAppl,
            deadline: this.state.date+" "+this.state.time,
            duration: this.state.duration,
            type: this.state.type,
            salary: this.state.salary,
            skills: this.state.skills,

        }
        console.log(newJob);

        axios.post('http://localhost:5000/user/recr/newJob', newJob)
             .then(res => {
                alert("Created job\t" + res.data.title);
                console.log(res);
                this.setState({
                  title:'',
                  maxAppl:0,
                  maxPos:0,
                  date:'',
                  time:'',
                  duration:0,
                  type:'',
                  salary:0,
                  skills: '',
                  email: '',
                });
                this.props.history.push('/dashboard');

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
        
        <Typography component="h1" variant="h5">
          Create a Job
        </Typography>
        <form style={classes.form} noValidate onSubmit={this.onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="title"
                name="title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
                value={this.state.title}
                onChange={(e)=>this.setState({title:e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="maxAppl"
                label="Maximum Applications"
                name="maxAppl"
                autoComplete="maxAppl"
                value={this.state.maxAppl}
                onChange={(e)=>this.setState({maxAppl:e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="maxPos"
                label="Maximum Positions"
                name="maxPos"
                autoComplete="maxPos"
                value={this.state.maxPos}
                onChange={(e)=>this.setState({maxPos:e.target.value})}
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
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="date"
                label="Application deadline date"
                type="date"
                defaultValue="2021-01-16"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>this.setState({date:e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="time"
                label="Application deadline time"
                type="time"
                defaultValue="17:30"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="skills"
                name="skills"
                variant="outlined"
                required
                fullWidth
                id="skills"
                label="Skills"
                value={this.state.skills}
                onChange={(e)=>this.setState({skills:e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" required fullWidth>
                <InputLabel id="select-label">Job Type</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  value={this.state.type}
                  onChange={(e)=>this.setState({type: e.target.value})}
                  label="type"
                >
                  <MenuItem value={"Full-time"}>
                    Full-time
                  </MenuItem>
                  <MenuItem value={""}>
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={"Part-time"}>Part-time</MenuItem>
                  <MenuItem value={"Work from Home"}>Work from Home</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" required fullWidth>
                <InputLabel id="select-label">Duration</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  value={this.state.duration}
                  onChange={(e)=>this.setState({duration: e.target.value})}
                  label="duration"
                >
                  <MenuItem value={0}>
                    0(indefinite)
                  </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="salary"
                name="salary"
                variant="outlined"
                required
                fullWidth
                id="salary"
                label="Salary per month"
                type="number"
                value={this.state.salary}
                helperText="Enter positive numbers only"
                error={(parseInt(this.state.salary)>=0)?false:true}
                onChange={(e)=> this.setState({salary:parseInt(e.target.value)||0})}
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

