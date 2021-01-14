import React, {Component} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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
            value:[20,37],
        };
        this.renderIcon = this.renderIcon.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sortSalaryChange = this.sortSalaryChange.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/user/appl/jobs')
             .then(response => {
                 this.setState({
                    jobs: response.data, 
                    sortedJobs:response.data
                });
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    handleChange(e,n){
        console.log(n);
        var arr = this.state.jobs;
        var filt = arr.filter((job, i)=>(job.salary>=n[0] && job.salary<=n[1]))
        this.setState({
            value:n,
            jobs: filt,
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
            <div style={{display:'flex', flexDirection: 'column'}}>
                <Grid container>
                <Grid item xs={12} md={12} lg={12}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem text>
                                        <h3>Dashboard</h3>
                        </ListItem>
                    </List>
                </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                    <List component="nav" aria-label="mailbox folders">
                        <TextField 
                        id="standard-basic" 
                        label="Search" 
                        fullWidth={true}   
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )}}
                        />
                    </List>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">

                            <ListItem button divider>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={this.state.jobs}
                                    getOptionLabel={(option) => option.title}
                                    style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Select Titles" variant="outlined" />}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <Typography id="range-slider" gutterBottom>
                          Temperature range
                        </Typography>
                        <Slider
                          value={this.state.value}
                          onChange={this.handleChange}
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
                                            <TableCell>Max Applications</TableCell>
                                            <TableCell>Max Positions</TableCell>
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
                                        <TableRow key={ind}>
                                            <TableCell>{job.date}</TableCell>
                                            <TableCell>{job.name}</TableCell>
                                            <TableCell>{job.email}</TableCell>
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