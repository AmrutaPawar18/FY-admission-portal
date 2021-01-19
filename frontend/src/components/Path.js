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
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


class ApplDash extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            sortedJobs: [], 
            filtjobs:[],
            sortSalary:true,
            sortBy:"salary",
            value:[20,1000],
            showSop:false,
            sop:'',
            jobId:'',
            maxSal:0,
            filtSal:false,
            filtType:false,
            type:'',
            filtDur:false,
            duration:'',
            desc:1
        };
        this.renderIcon = this.renderIcon.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.filtJobs = this.filtJobs.bind(this);
        this.filtAlt = this.filtAlt.bind(this);
        this.onSliderChange = this.onSliderChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
        this.apply = this.apply.bind(this);
        this.handleClose= this.handleClose.bind(this);
        this.handleDiaSubmit = this.handleDiaSubmit.bind(this);
        this.sortJobs = this.sortJobs.bind(this);
        this.sortAlt = this.sortAlt.bind(this);
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
              sortedJobs:array,
              filtjobs:array,
              maxSal:array[0].salary
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
    async onCheckChange(event) {
        await this.setState({ [event.target.name]: event.target.checked });
        this.filtJobs();
    }

    apply(id,e){
      this.setState({jobId:id, showSop:true})
    }

    async filtAlt(e){
      await this.setState({ [e.target.name]: e.target.value });
      this.filtJobs();
    }

    async onSliderChange(e,n){
      await this.setState({value:n})
      this.filtJobs()
    }

    filtJobs(){
      var arr = this.state.jobs;
      
      var filt = [];
      if(this.state.filtSal){
        var n = this.state.value
        arr = arr.filter((job, i)=>(job.salary>=n[0] && job.salary<=n[1]))
      }
      if(this.state.filtType){
        arr = arr.filter((job, i)=>(job.type===this.state.type))
      }
      if(this.state.filtDur){
        arr = arr.filter((job, i)=>(job.duration<this.state.duration))
      }
      this.setState({
        filtjobs:arr
      })
    }

    async sortAlt(e){
      await this.setState({ [e.target.name]: e.target.value });
      this.sortJobs();
    }

    sortJobs(){
/**
 *      Note that this is sorting only at front-end.
 */
        var array = this.state.filtjobs;
        var flag = this.state.desc ;  //when desc 0 we have to change it to 1
                                // and sort in desc. sort will be in desc if flag=1
        var sb = this.state.sortBy;
        if(sb==="salary"){
          array.sort(function(a, b) {
            if(a.salary != undefined && b.salary != undefined){
                return (1 - flag*2) * (a.salary - b.salary);
            }
            else{
                return 1;
            }
          });
        }
        else if(sb ==="duration"){
          array.sort(function(a, b) {
            if(a.duration != undefined && b.duration != undefined){
                return (1 - flag*2) * (a.duration - b.duration);
            }
            else{
                return 1;
            }
          });
        }
        else if(sb ==="rating"){
          array.sort(function(a, b) {
            if(a.rating != undefined && b.rating != undefined){
                return (1 - flag*2) * (a.rating - b.rating);
            }
            else{
                return 1;
            }
          });
        }
        //console.log(flag)
        this.setState({
            filtjobs:array,
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
              multiline
              rows={4}
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


        <Grid container spacing={1}>
        <Grid item xs={12} md={9}>
          <Paper style={{textAlign:'center', marginBottom:10, padding:10}}>
          <Grid container spacing={1}>
          <Grid item xs={12}>
          <Typography> FILTER:</Typography>
          </Grid>
          <Grid item xs={6} md={4}>
          <Paper elevation={0} style={{textAlign:'center'}}>
          <FormControlLabel
                control={<Checkbox color="primary" 
                name="filtSal"
                checked={this.state.filtSal}
                onChange={this.onCheckChange}/>}
                label="Salary"
                labelPlacement="bottom"
              />
          <Slider
                max={this.state.maxSal?this.state.maxSal+100:10000}
                value={this.state.value}
                onChange={this.handleChange}
                onChangeCommitted={this.filtJobs}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
              />
              </Paper>
              </Grid>
              <Grid item xs={4}>
              <Paper elevation={0} style={{textAlign:'center'}}>
                <FormControlLabel
                control={<Checkbox color="primary" 
                name="filtType"
                checked={this.state.filtType}
                onChange={this.onCheckChange}/>}
                label="Job Type"
                labelPlacement="bottom"
              />
              <FormControl variant="outlined" fullWidth>
                <Select
                  labelId="select-label"
                  id="select"
                  name="type"
                  value={this.state.type}
                  onChange={this.filtAlt}

                >
                  <MenuItem value={""}>
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={"Full-time"}>
                    Full-time
                  </MenuItem>
                  <MenuItem value={"Part-time"}>Part-time</MenuItem>
                  <MenuItem value={"Work from Home"}>Work from Home</MenuItem>
                </Select>
              </FormControl>
              </Paper>
              </Grid>

              <Grid item xs={4}>
                <Paper elevation={0} style={{textAlign:'center'}}>
              <FormControlLabel
                control={<Checkbox color="primary" 
                name="filtDur"
                checked={this.state.filtDur}
                onChange={this.onCheckChange}/>}
                label="Duration less than:"
                labelPlacement="bottom"
              />
              <FormControl variant="outlined" fullWidth>
                <Select
                  labelId="select-label"
                  id="select"
                  name="duration"
                  value={this.state.duration}
                  onChange={this.filtAlt}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                </Select>
              </FormControl>
              </Paper>

              </Grid>
              </Grid>
              </Paper>
              </Grid>

          <Grid item xs={12} md={3}>
          <Paper style={{textAlign:'center', paddingTop:10, marginBottom:5}}>
          <Grid container spacing={0}>
          <Grid item xs={6}>
          <Typography> SORT: </Typography>
          </Grid>
          <Grid item xs={6}>
          <Select
                  labelId="select-label"
                  id="select"
                  name="desc"
                  value={this.state.desc}
                  onChange={this.sortAlt}
                >
                  <MenuItem value={0}>
                    Ascending
                  </MenuItem>
                  <MenuItem value={1}>Descending</MenuItem>
          </Select>
          </Grid>
          <Grid item xs={12}>
          <FormControl component="fieldset">
  <RadioGroup aria-label="sort" name="sortBy" value={this.state.sortBy} onChange={this.sortAlt}>
    <FormControlLabel value="salary" control={<Radio />} label="Salary" />
    <FormControlLabel value="duration" control={<Radio />} label="Duration" />
    <FormControlLabel value="rating" control={<Radio />} label="Rating" />
  </RadioGroup>
</FormControl>
        </Grid>
        </Grid>
        </Paper>
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
                      <TableCell> Salary</TableCell>
                      <TableCell>Rating</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.filtjobs.map((job,ind) => (
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