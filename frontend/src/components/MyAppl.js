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
import Rating from '@material-ui/lab/Rating';
import ApplNavbar from './ApplNavbar.js';
import moment from 'moment'

import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


class UsersList extends Component {
    
  constructor(props) {
      super(props);
      this.state = {
        applications: [],
      };
      this.addRating = this.addRating.bind(this);
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


  addRating(a, event){
    var token = localStorage.getItem('token');
    var newValue = event.target.value;
    console.log(a)
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
      axios.post(`http://localhost:5000/appl/rate/${a._id}`, {rating:newValue}, config)
         .then(response => {
            var temp= this.state.applications.map(x=> x._id===a._id?{...x, job_rating: newValue}:x);
            this.setState({applications:temp});
         })
         .catch(function(error) {
             console.log(error);
         })

  }


  render() {
    return (
      <div>
      <ApplNavbar/>
      <h4> My Applications</h4>
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
                    <TableCell>You rated the job</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.applications.map((data,ind) => (
                      <TableRow key={ind}>
                        <TableCell>{data.job_title}</TableCell>
                        <TableCell>{data.recr_id.fname}</TableCell>
                        <TableCell>{data.job_salary}</TableCell>
                        <TableCell>{data.stage}</TableCell>
                        <TableCell>{moment(data.doj).format('DD-MM-YYYY')}</TableCell>
                        <TableCell>
                          {(data.stage==="Accepted")?<Rating
                            value={data.job_rating}
                            onChange={(event) => {this.addRating(data,event)}}
                            readOnly={data.job_rating}
                          />:null}
                        </TableCell>
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