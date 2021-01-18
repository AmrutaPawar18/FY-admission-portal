import React, {Component} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


class ApplDash extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            sortedJobs: [], 
            sortSalary:true,
            value:[20,1000],
            showSop:false,
            sop:'',
            jobId:''
        };
        this.renderIcon = this.renderIcon.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.filtSalJobs = this.filtSalJobs.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.apply = this.apply.bind(this);
        this.handleClose= this.handleClose.bind(this);
        this.handleDiaSubmit = this.handleDiaSubmit.bind(this);
        this.sortSalaryChange = this.sortSalaryChange.bind(this);
        this.loadJobs = this.loadJobs.bind(this);
    }

    loadJobs(){
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
        axios.get('http://localhost:5000/appl/',config)
          .then(response => {
            var array = response.data;
            array.sort(function(a, b) {
              if(a.salary != undefined && b.salary != undefined){
                  return (-1) * (a.salary - b.salary);
              }
              else{
                  return 1;
              }
            });
            this.setState({
              jobs: array, 
              sortedJobs:array
            });
          })
          .catch(function(error) {
            console.log(error);
          })
    }

    componentDidMount() {
      this.loadJobs();
    }

    handleChange(e,n){
      //  console.log(n);
       
        this.setState({
            value:n,
        })
    }

    handleClose(e){
      e.preventDefault();
      this.setState({
        sop:'',
        showSop:false,
        jobId:''
      });
    }

    handleDiaSubmit(e){
      e.preventDefault();
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

        var data = {sop:this.state.sop, job_id:this.state.jobId}

      axios.post('http://localhost:5000/appl/apply',data, config)
          .then(response => {
            
            this.setState({
              showSop:false,
              sop:'',
              jobId:''
            });
            this.loadJobs();
            alert("Submitted application!");

          })
          .catch(function(error) {
            console.log(error);
            alert("Something went wrong. Please try again");
          })
    }

    onInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    apply(id,e){
      this.setState({jobId:id, showSop:true})
    }

    filtSalJobs(e,n){
      var arr = this.state.jobs;
        var filt = arr.filter((job, i)=>(job.salary>=n[0] && job.salary<=n[1]))
      this.setState({
        value:n,
        jobs:filt
      })
    }

    sortSalaryChange(){
/**
 *      Note that this is sorting only at front-end.
 */
        var array = this.state.jobs;
        var flag = this.state.sortSalary;
        array.sort(function(a, b) {
            if(a.salary != undefined && b.salary != undefined){
                return (1 - flag*2) * (a.salary - b.salary);
            }
            else{
                return 1;
            }
          });
        this.setState({
            jobs:array,
            sortSalary:!this.state.sortSalary,
        })
    }

    renderIcon(){
        if(this.state.sortSalary){
            return(
                <ArrowDownwardIcon/>
            )
        }
        else{
            return(
                <ArrowUpwardIcon/>
            )            
        }
    }

    render() {
      return (
        <div style={{flexGrow:1,display:'flex', flexDirection: 'column'}}>
          <Typography component="h1" variant="h4" style={{marginBottom:10}}>
          Dashboard
        </Typography>

        <Dialog open={this.state.showSop} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Submit application</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
              autoFocus
              id="sop"
              label="Statement of Purpose"
              fullWidth
              name= "sop"
              required
              value={this.state.sop}
              onChange={ this.onInputChange}
            />
            </Grid>
           
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDiaSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>


          <Grid container>
           
            <Grid item xs={12} md={3} lg={3}>
              <Typography id="range-slider" gutterBottom>
                Salary range
              </Typography>
              <Slider
                max={this.state.sortedJobs[0]?this.state.sortedJobs[0].salary+100:10000}
                value={this.state.value}
                onChange={this.handleChange}
                onChangeCommitted={this.filtSalJobs}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={12} lg={12}>
              <Paper>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Recruiter Name @ Email</TableCell>
                      <TableCell>Date of posting</TableCell>
                      <TableCell>Deadline for application</TableCell>
                      <TableCell>Required Skills</TableCell>
                      <TableCell>Type of Job</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell> <Button onClick={this.sortSalaryChange}>{this.renderIcon()}</Button>Salary</TableCell>
                      <TableCell>Rating</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.jobs.map((job,ind) => (
                      <TableRow key={job._id}>
                        <TableCell>{job.title}</TableCell>
                        <TableCell>{job.recr_id.fname+" "+job.recr_id.lname+" @ "+job.recr_id.email}</TableCell>
                        <TableCell>{job.date_of_post}</TableCell>
                        <TableCell>
                          {job.deadline}
                          {(job.applied)?(<Chip label="Applied"/>):((job.maxAppl-job.appl_got)<=0)||((job.maxPos-job.posn_filled)<=0)?
                            (
                            <Button
                              size="small"
                              color="secondary">
                              Filled
                            </Button>
                            ):(
                            <Button
                              size="small"
                              onClick={(e)=>this.apply(job._id,e)}
                              style={{backgroundColor:'green', color:'white'}}>
                              Apply
                            </Button>
                            )}
                        </TableCell>
                        <TableCell>{job.skills.map((data)=>(
                          <Chip
                            key={data.key}
                            label={data.label}
                          />
                        ))}</TableCell>
                        <TableCell>{job.type}</TableCell>
                        <TableCell>{job.duration?job.duration:"0(indefinite)"}</TableCell>
                        <TableCell>{job.salary}</TableCell>
                        <TableCell>{job.rating}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>               
            </Grid>    
          </Grid>            
        </div>
      )
    }
}

export default ApplDash;