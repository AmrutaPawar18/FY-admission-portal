import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import moment from 'moment'

import AdminNavbar from './AdminNavbar.js';

const classes={
	paper: {
      padding:'5%', 
      justifyContent:'center', 
      alignItems:'center', 
      display:'flex', 
      flexDirection:'column', 
      marginTop:'10%'    
    },
    title:{fontSize:14}
}

export default class RecrDash extends React.Component{
	constructor(props){
		super(props);
		this.state={
			jobs:[],
		}
    this.onIntInputChange = this.onIntInputChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.editButton = this.editButton.bind(this);
	}

	componentDidMount() {
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
        axios.get('http://localhost:5000/recr/',config)
          .then(response => {
            var array = response.data.map(ele=>{return({... ele, edit:false})})
            console.log(array)
            
            this.setState({
              jobs: array
            });
          })
          .catch(function(error) {
            console.log(error);
          })
    }

    onInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onIntInputChange(e) {
        this.setState({ [e.target.name] : parseInt(e.target.value)||0})
    }

    deleteJob(id, e){
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


      var filt = this.state.jobs.filter((job)=>job._id!=id)

      axios.delete(`http://localhost:5000/recr/deleteJob/${id}`, config)
        .then(response => {
          
          this.setState({
            jobs: filt
          });
        })
        .catch(function(error) {
          console.log(error);
        })
    }

    editButton(ind, e){
    	if(this.state.jobs[ind].edit){
    		//update in backend
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

        var job = this.state.jobs;

        var data = { 
        	id:job[ind]._id, 
        	maxPos:job[ind].maxPos, 
        	maxAppl:job[ind].maxAppl, 
        	deadline:job[ind].deadline
        }

        if(data.maxAppl<=0){
        	alert("Max applications should be greater than zero");
        	return
        }

        if(data.maxPos<=0){
        	alert("Max positions should be greater than zero")
        	return
        }

        job[ind].edit = false;
        axios.post('http://localhost:5000/recr/updateJob', data ,config)
          .then(response => {
            
            this.setState({
              jobs: job
            });
          })
          .catch(function(error) {
            console.log(error);
          })
    	}
    	else{
    		var array=this.state.jobs
    		array[ind].edit = true;
    		this.setState({jobs:array});
    	}
    }


	render(){
		return(
			<div>
			<RecrNavbar/>
			<Container component="main" style={classes.paper}>
			
			<h4>My Job Listings</h4>
			<Button><Link to="/createJob">+ Create a job</Link></Button>
			{this.state.jobs.length?"":"You don't have any active jobs"}
			<Grid container spacing={2}>
			{this.state.jobs.map((j,ind)=>(
				<Grid item xs={12} sm={6} lg={4}>
			<Card className={classes.root}>
      <CardContent>
        <Typography title={classes.title} color="textSecondary" gutterBottom>
          {moment(j.date_of_post).format('DD-MM-YYYY HH:mm')}
        </Typography>
        <Typography variant="h5" component="h2">
          {j.title}
        </Typography>
        {j.edit?(
        	<Grid container spacing={1}>
        	<Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id={"maxAppl"+j._id}
                label="Maximum Applications"
                type="number"
                autoComplete="maxAppl"
                value={j.maxAppl}
                helperText="Enter positive numbers only"
                onChange={(e)=>{
                  var temp = this.state.jobs; 
                  temp[ind].maxAppl = parseInt(e.target.value)||1; 
                  this.setState({jobs:temp})
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id={"maxPos"+j._id}
                label="Maximum Positions"
                type="number"
                autoComplete="maxPos"
                value={j.maxPos}
                helperText="Enter positive numbers only"
                onChange={(e)=>{
                  var temp = this.state.jobs; 
                  temp[ind].maxPos = parseInt(e.target.value)||1; 
                  this.setState({jobs:temp})
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id={"date"+j._id}
                label="Application deadline date"
                type="date"
                value = {j.deadline.split(' ')[0]}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>{
                  var temp = this.state.jobs; 
                  temp[ind].deadline = e.target.value+" "+j.deadline.split(' ')[1]; 
                  this.setState({jobs:temp})
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id={"time"+j._id}
                label="Application deadline time"
                type="time"
                value = {j.deadline.split(' ')[1]}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                onChange={(e)=>{
                  var temp = this.state.jobs; 
                  temp[ind].deadline = j.deadline.split(' ')[0]+" "+e.target.value; 
                  this.setState({jobs:temp})
                }}
              />
            </Grid>
            </Grid>):(
            <Grid container spacing={1}>
            <Grid item>
        	<Typography style={classes.pos} color="textSecondary">
          Deadline: {j.deadline}
        </Typography>
        </Grid>
        <Grid item xs={12}>
        <Typography style={classes.pos} color="textSecondary">
          Maximum Applications: {j.maxAppl}
        </Typography>
        </Grid>
        <Grid item>
        <Typography color="textSecondary">
          Maximum Positions: {j.maxPos}
        </Typography>
        </Grid>
        </Grid>)}
        <Typography variant="body2" component="p">
          Remaining Positions: {j.maxPos-j.posn_filled}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" size="small" onClick={(e)=>this.editButton(ind,e)}>{j.edit?"Update":"Edit"}</Button>

        <Link to={{pathname:`/applications/${j._id}`,data:j._id}}>
        	<Button color="primary" size="small">Show Applications</Button>
        </Link>

        <Button color="primary" size="small" onClick={(e)=>this.deleteJob(j._id,e)}>Delete</Button>
      </CardActions>
    </Card>
    </Grid>))}
    </Grid>
    </Container>
    </div>
    
		)
	}
}