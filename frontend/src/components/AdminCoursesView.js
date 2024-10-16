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
import AdminNavbar from './AdminNavbar.js';
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import moment from 'moment'


class CoursesView extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          courses: []
        };        
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
          axios.get('http://localhost:5000/admin/courses', config)
               .then(response => {
                this.setState({courses: response.data});
                })
                // console.log(response.data);
                // console.log(array)
               .catch(function(error) {
                   console.log(error);
               })
      }

      render() {
        return (
            <div>
            <AdminNavbar/>
              <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem text>
                                        <h3>Courses</h3>
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
                                            <TableCell>Course Name</TableCell>    
                                            <TableCell>Department</TableCell>
                                            <TableCell>Capacity</TableCell>
                                            <TableCell>Applications Received</TableCell>
                                            <TableCell>Seats Filled</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.courses.map((c,ind) => (

                                        <TableRow>
                                            <TableCell>{c.title}</TableCell>
                                            <TableCell>{c.dept}</TableCell>
                                            <TableCell>{c.capacity}</TableCell>
                                            <TableCell>{c.appl_received}</TableCell>
                                            <TableCell>{c.seats_filled}</TableCell>

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

export default CoursesView;
