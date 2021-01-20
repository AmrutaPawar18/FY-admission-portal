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

import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


class UsersList extends Component {
    
  constructor(props) {
      super(props);
      this.state = {
        applications: [],
      };
      this.renderIcon = this.renderIcon.bind(this);
      this.sortChange = this.sortChange.bind(this);
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
    axios.get('http://localhost:5000/appl/applications',config)
         .then(response => {
             this.setState({applications: response.data});
         })
         .catch(function(error) {
             console.log(error);
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

  render() {
    return (
      <div>
        <Grid container>
            
          <Grid item xs={12} >
            <Paper>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell> Title</TableCell>
                    <TableCell>Name of recruiter</TableCell>
                    <TableCell> Salary</TableCell>
                    <TableCell>Application Stage</TableCell>
                    <TableCell>Date of joining</TableCell>
                    <TableCell>Rate the job</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.applications.map((data,ind) => (
                      <TableRow key={ind}>
                        <TableCell>{data.job_id.title}</TableCell>
                        <TableCell>{data.recr_id.fname}</TableCell>
                        <TableCell>{data.job_id.salary}</TableCell>
                        <TableCell>{data.stage}</TableCell>
                        <TableCell>{data.doj}</TableCell>
                        <TableCell>stars</TableCell>
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

export default UsersList;