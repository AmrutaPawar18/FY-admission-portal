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
import RadioGroup from '@material-ui/core/RadioGroup';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import RecrNavbar from './RecrNavbar.js';
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import moment from 'moment'


class ApplDash extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          applications: [],
          // sortedUsers: [],
          // sortName:true,
          // desc:0,
          // sortBy:"date_of_appl"
        };
        // this.renderIcon = this.renderIcon.bind(this);
        // this.sortChange = this.sortChange.bind(this);
        this.onAccept = this.onAccept.bind(this);
        // this.onShortlist = this.onShortlist.bind(this);
        // this.sortApplic = this.sortApplic.bind(this);
        // this.sortAlt = this.sortAlt.bind(this);   //on changing sort section dropdowns
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
        console.log(this.props.match.params)
        axios.post('http://localhost:5000/appl/applications', config)
             .then(response => {
              var array = response.data;
              array.sort(function(a, b) {
                if(a.date_of_appl != undefined && b.date_of_appl != undefined){
                    return (1) * (new Date(a.date_of_appl).getTime() - new Date(b.date_of_appl).getTime());
                }
                else{
                    return 1;
                }
              });
              // console.log(response.data);
              // console.log(array)
                 this.setState({applications: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    onAccept(a, e){  //a is the application object
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
        var data = {
          appl_id:a.appl_id, 
          appl_user_id:a.appl_user_id._id,
          course_title:a.course_title,
          date_of_appl: a.date_of_appl,
          stage: a.stage,
        }
        console.log(data)
        console.log(a)
    }

    async sortAlt(e){
      await this.setState({ [e.target.name]: e.target.value });
      this.sortApplic();
    }

//     sortApplic(){
// /**
//  *      Note that this is sorting only at front-end.
//  */
//         var array = this.state.applications.map(a=>({...a, name:a.appl_user_id.fname+" "+a.appl_user_id.lname}))
//     //    console.log(array);
//         var flag = this.state.desc ;  //when desc 1 we have to 
//                                 // sort in desc. sort will be in desc if flag=1
//         var sb = this.state.sortBy;
//         if(sb==="name"){
//           array.sort(function(a, b) {
//             if(a.name != undefined && b.name != undefined){
//                 return (1 - flag*2) * (a.name.localeCompare(b.name));
//             }
//             else{
//                 return 1;
//             }
//           });
//         }
//         else if(sb ==="date_of_appl"){
//           array.sort(function(a, b) {
//             if(a.date_of_appl != undefined && b.date_of_appl != undefined){
//                 return (1 - flag*2) * (new Date(a.date_of_appl).getTime() - new Date(b.date_of_appl).getTime());
//             }
//             else{
//                 return 1;
//             }
//           });
//         }
//         else if(sb ==="rating"){
//           array.sort(function(a, b) {
//             if(a.appl_id.rating != undefined && b.appl_id.rating != undefined){
//                 return (1 - flag*2) * (a.appl_id.rating - b.appl_id.rating);
//             }
//             else{
//                 return 1;
//             }
//           });
//         }
//         //console.log(flag)
//         this.setState({
//             applications:array,
//             sortSalary:!this.state.sortSalary,
//         })
//     }

//     sortChange(){
// /**
//  *      Note that this is sorting only at front-end.
//  */
//         var array = this.state.users;
//         var flag = this.state.sortName;
//         array.sort(function(a, b) {
//             if(a.date != undefined && b.date != undefined){
//                 return (1 - flag*2) * (new Date(a.date) - new Date(b.date));
//             }
//             else{
//                 return 1;
//             }
//           });
//         this.setState({
//             users:array,
//             sortName:!this.state.sortName,
//         })
//     }

    // renderIcon(){
    //     if(this.state.sortName){
    //         return(
    //             <ArrowDownwardIcon/>
    //         )
    //     }
    //     else{
    //         return(
    //             <ArrowUpwardIcon/>
    //         )            
    //     }
    // }

    render() {
        return (
            <div>
            <RecrNavbar/>
              <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem text>
                                        <h3>Applications</h3>
                        </ListItem>
                    </List>
                </Grid>
              </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                            <TableCell>Applicant ID</TableCell>
                                            <TableCell>Course</TableCell>    
                                            <TableCell>Date of Application</TableCell>
                                            <TableCell>Stage</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.applications.map((a,ind) => (

                                        <TableRow>
                                            <TableCell>{a.appl_user_id._id}</TableCell>
                                            <TableCell>{a.course_title}</TableCell>
                                            <TableCell>{moment(a.date_of_appl).format('DD-MM-YYYY')}</TableCell>
                                            <TableCell>{a.stage}</TableCell>

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