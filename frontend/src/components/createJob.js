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
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {InputTag} from './Tag.js';


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
            title:'',
            maxAppl:50,
            maxPos:5,
            date:"",
            time:"00:00",
            duration:0,
            type:'',
            salary:0,
            skills: '',
            email: '',
            chips: [],
            authorized:true
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onIntInputChange = this.onIntInputChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.addSkill = this.addSkill.bind(this);
    }

    componentDidMount() {
      var x = localStorage.getItem('role');
      console.log(x);
      if(x){
        if(x==='Recruiter'){}
        else{
          this.setState({authorized:false})
        }
      }

    }

    handleDelete(chip){
      console.log(chip.target);
      var chips = this.state.chips.filter((data)=> data===chip);
      console.log(chips);
      this.setState(chips)
    }

    addSkill(e){
      if (!(e.key === 'Enter')) return;
      var arr = this.state.chips;
      var val = e.target.value;
      var i = arr.findIndex((ele) => ele.key === val.toLowerCase());
      if(i !== -1){ 
        this.setState({skills:''});
        return;
      }
      arr.push({key: val.toLowerCase(), label:e.target.value});
    //  console.log(arr);
      this.setState({chips: arr, skills:''});

    }

    
    onInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onIntInputChange(e) {
        this.setState({ [e.target.name] : parseInt(e.target.value)||0})
    }

    onSubmit(e) {
        e.preventDefault();
        var arr = this.state.chips.map((it)=> (it.label))
      //  console.log(this.state.chips);
        const newJob = {
            
            title: this.state.title,
            maxPos: this.state.maxPos,
            maxAppl: this.state.maxAppl,
            deadline: this.state.date+" "+this.state.time,
            duration: this.state.duration,
            type: this.state.type,
            salary: this.state.salary,
            skills: arr,

        }
        // console.log(newJob);
        // console.log(!this.state.title );
        // console.log(!(this.state.date===''));
        // console.log(!(this.state.time===""))
        // console.log(!(this.state.type));
        // console.log(!(this.state.chips===[]));
        if(!this.state.title || (this.state.date==='') || (this.state.time==="") 
          || !this.state.type || (this.state.chips===[])){
          alert("Please fill all neccessary fields");
          return;
        }
        if(this.state.maxPos<=0){
          alert("Maximum Positions should be greater than zero");
          return;
        }
        if(this.state.maxAppl<=0){
          alert("Maximum Applications should be greater than zero");
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

        axios.post('http://localhost:5000/recr/newJob', newJob, config)
             .then(res => {
               alert("Created job\t" + res.data.job.title);
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
                  chips:[],
                  email: '',
                });
                this.props.history.push('/dashboard');

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
              //  console.log(err.response.data.error);
             })
             ;
   }

    render() {
    //  console.log(this.state.chips);
      const handleDelete = (chipToDelete) => () => {
          var x = this.state.chips.filter((chip) => chip.key !== chipToDelete.key)
          this.setState({chips:x});
      };

      if(!this.state.authorized)
        return(
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div style={classes.paper}>
              
              <Typography component="h1" variant="h5">
                {"You don't have permissions to view this page!"}
              </Typography>
            </div>
          </Container>
          )

        return (
            <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={classes.paper}>
        
        <Typography component="h1" variant="h5">
          Create a Job
        </Typography>
        <form style={classes.form} noValidate onSubmit={this.onSubmit}
          onKeyPress={event => {
          if (event.which === 13 /* Enter */) {
            event.preventDefault();
          }
        }}>
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
                type="number"
                autoComplete="maxAppl"
                value={this.state.maxAppl}
                helperText="Enter positive numbers only"
                error={(parseInt(this.state.maxAppl)>0)?false:true}
                onChange={this.onIntInputChange}
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
                type="number"
                autoComplete="maxPos"
                value={this.state.maxPos}
                helperText="Enter positive numbers only"
                error={(parseInt(this.state.maxPos)>0)?false:true}
                onChange={this.onIntInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="date"
                name="date"
                label="Application deadline date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.onInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="time"
                name="time"
                label="Application deadline time"
                type="time"
                defaultValue = "00:00"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                onChange={this.onInputChange}
              />
            </Grid>
            <Grid item xs={12}>
            <Typography>Skills*</Typography>
                <FormControl variant="outlined" required fullWidth>
                  <Grid container spacing={1}>
                  
                  
                    {this.state.chips.map((data)=>(
                      <Grid item key={data.key}>
                        <Chip
                          key={data.key}
                          label={data.label}
                          onDelete={handleDelete(data)}
                        />
                      </Grid>))
                    }



                    <Grid item>
                      <TextField
                        autoComplete="skills"
                        name="skills"
                        fullWidth
                        id="skills"
                        label="Add a skill"
                        value={this.state.skills}
                        onChange={this.onInputChange}
                        onKeyDown = {this.addSkill}
                      />
                    
                    </Grid>
                  </Grid>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" required fullWidth>
                <InputLabel id="select-label">Job Type</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  name="type"
                  value={this.state.type}
                  onChange={this.onInputChange}
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
                  name="duration"
                  value={this.state.duration}
                  onChange={this.onInputChange}
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
                onChange={this.onIntInputChange}
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
            Create Job
          </Button>
        </form>
      </div>
           
           </Container>
        )
    }
}

