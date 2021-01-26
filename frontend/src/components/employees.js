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
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import Rating from '@material-ui/lab/Rating';
import RadioGroup from '@material-ui/core/RadioGroup';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import moment from 'moment'

import RecrNavbar from './RecrNavbar.js';
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


class UsersList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          emp: [],
          sortedUsers: [],
          sortName:true,
          desc:1,
          sortBy:"doj"
        };
        this.renderIcon = this.renderIcon.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.sortApplic = this.sortApplic.bind(this);
        this.sortAlt = this.sortAlt.bind(this);   //on changing sort section dropdowns
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
        axios.get('http://localhost:5000/recr/employees', config)
             .then(response => {
              var array = response.data;
              array.sort(function(a, b) {
                if(a.doj != undefined && b.doj != undefined){
                    return (-1) * (new Date(a.doj).getTime() - new Date(b.doj).getTime());
                }
                else{
                    return 1;
                }
              });
              // console.log(response.data);
              // console.log(array)
                 this.setState({emp: array, sortedUsers:response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }


    async sortAlt(e){
      await this.setState({ [e.target.name]: e.target.value });
      this.sortApplic();
    }

    sortApplic(){
/**
 *      Note that this is sorting only at front-end.
 */
        var array = this.state.emp.map(a=>({...a, name:a.appl_user_id.fname+" "+a.appl_user_id.lname}))
    //    console.log(array);
        var flag = this.state.desc ;  //when desc 1 we have to 
                                // sort in desc. sort will be in desc if flag=1
        var sb = this.state.sortBy;
        if(sb==="name"){
          array.sort(function(a, b) {
            if(a.name != undefined && b.name != undefined){
                return (1 - flag*2) * (a.name.localeCompare(b.name));
            }
            else{
                return 1;
            }
          });
        }
        else if(sb==="title"){
          array.sort(function(a, b) {
            if(a.job_title != undefined && b.job_title != undefined){
                return (1 - flag*2) * (a.job_title.localeCompare(b.job_title));
            }
            else{
                return 1;
            }
          });
        } 
        else if(sb ==="doj"){
          array.sort(function(a, b) {
            if(a.doj != undefined && b.doj != undefined){
                return (1 - flag*2) * (new Date(a.doj).getTime() - new Date(b.doj).getTime());
            }
            else{
                return 1;
            }
          });
        }
        else if(sb ==="rating"){
          array.sort(function(a, b) {
            if(a.appl_id.rating != undefined && b.appl_id.rating != undefined){
                return (1 - flag*2) * (a.appl_id.rating - b.appl_id.rating);
            }
            else{
                return 1;
            }
          });
        }
        //console.log(flag)
        this.setState({
            emp:array,
            sortSalary:!this.state.sortSalary,
        })
    }

    sortChange(){
/**
 *      Note that this is sorting only at front-end.
 */
        var array = this.state.users;
        var flag = this.state.sortName;
        array.sort(function(a, b) {
            if(a.date != undefined && b.date != undefined){
                return (1 - flag*2) * (new Date(a.date) - new Date(b.date));
            }
            else{
                return 1;
            }
          });
        this.setState({
            users:array,
            sortName:!this.state.sortName,
        })
    }

    renderIcon(){
        if(this.state.sortName){
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

    addRating(newValue, a, event){
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
        axios.post(`http://localhost:5000/recr/rate/${a._id}`, {rating:newValue}, config)
           .then(response => {
              var temp= this.state.emp.map(x=> x._id===a._id?{...x, appl_rating: newValue}:x);
              this.setState({emp:temp});
           })
           .catch(function(error) {
               console.log(error);
           })

      
    }

    render() {
        return (
          <div>
          <RecrNavbar/>
            <div style={{flexGrow:1,display:'flex', flexDirection: 'column', justifyContent:'center', margin:10}}>
              
              <Typography component="h1" variant="h4" style={{marginBottom:10}}>
                Employees
              </Typography>

              <Grid container>
                
                <Grid item xs={12} md={9} lg={9}>
                  <Paper elevation={0} style={{textAlign:'center', paddingTop:10, marginBottom:5}}>
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
              <FormControlLabel value="name" control={<Radio />} label="Applicant Name" />
              <FormControlLabel value="title" control={<Radio />} label="Job Title" />
              <FormControlLabel value="doj" control={<Radio />} label="Date of joining" />
              <FormControlLabel value="rating" control={<Radio />} label="Applicant Rating" />
            </RadioGroup>
          </FormControl>
                  </Grid>
                  </Grid>
                  </Paper>
                    </Grid>
                </Grid>
                <Divider/>
                <Divider/>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Date of Joining</TableCell>
                                            <TableCell>Job title</TableCell>
                                            <TableCell>Job type</TableCell>
                                            <TableCell>Salary</TableCell>
                                            <TableCell>Applicant Rating</TableCell>
                                            <TableCell>Your rating</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.emp.map((a,ind) => (
                                        <TableRow key={a._id}>
                                            <TableCell>{a.appl_user_id.fname+" "+a.appl_user_id.lname}</TableCell>
                                            <TableCell>{moment(a.doj).format('DD-MM-YYYY')}</TableCell>
                                            <TableCell>{a.job_title}</TableCell>
                                            <TableCell>{a.job_type}</TableCell>
                                            <TableCell>Salary</TableCell>
                                            <TableCell>{a.appl_id.rating}</TableCell>
                                            <TableCell>
                                              <Rating
                                                name="simple-controlled"
                                                value={a.appl_rating}
                                                onChange={(event, newValue) => {this.addRating(newValue,a,event)}}
                                                readOnly={a.appl_rating}
                                              />
                                            </TableCell>

                                        </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    
                </Grid>            
            </div>
          </div>
        )
    }
}

export default UsersList;