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


class AdminApplView extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          applications: []
        };
        // this.renderIcon = this.renderIcon.bind(this);
        // this.sortChange = this.sortChange.bind(this);
        this.onAccept = this.onAccept.bind(this);
        this.onDocsVerified = this.onDocsVerified.bind(this);
        this.onFeesPaid = this.onFeesPaid.bind(this);
        this.onReject = this.onReject.bind(this);
        this.onViewSSC = this.onViewSSC.bind(this);
        this.onViewHSC = this.onViewHSC.bind(this);
        this.onViewAadhar = this.onViewAadhar.bind(this);
        this.onViewCET = this.onViewCET.bind(this);
        // this.onShortlist = this.onShortlist.bind(this);
        // this.sortApplic = this.sortApplic.bind(this);
        // this.sortAlt = this.sortAlt.bind(this);   //on changing sort section dropdowns
    }

    async componentDidMount() {
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
        await axios.get('http://localhost:5000/admin/applications', config)
             .then(response => {
                console.log(response.data);
                this.setState({applications: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    onAccept(a, e) {  //a is the application object
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
        console.log(a);
     axios.put(`http://localhost:5000/admin/accept/{a._id}`, config)
         .then(res => {
            var arr= this.state.applications.map(x=> x._id===a._id?{...x,stage:"Accepted"}:x);
            this.setState({applications:arr})
         })
         .catch(function(error) {
             console.log(error);
         })
    }

    onDocsVerified(a, e){  //a is the application object
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
        console.log(a);
     axios.post(`http://localhost:5000/admin/updateStatus/{a._id}/DocumentsVerified`, config)
         .then(res => {
            var arr= this.state.applications.map(x=> x._id===a._id?{...x,stage:"Documents Verified"}:x);
            this.setState({applications:arr})
         })
         .catch(function(error) {
             console.log(error);
         })
    }

    onFeesPaid(a, e){  //a is the application object
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
        console.log(a);
     axios.put(`http://localhost:5000/admin/updateStatus/{a._id}/"FeesPaid"`, config)
         .then(res => {
            var arr= this.state.applications.map(x=> x._id===a._id?{...x,stage:"Fees Paid"}:x);
            this.setState({applications:arr})
         })
         .catch(function(error) {
             console.log(error);
         })
    }

    onReject(a, e){  //a is the application object
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
        console.log(a);
     axios.put(`http://localhost:5000/admin/updateStatus/{a._id}/"Rejected"`, config)
         .then(res => {
            var arr= this.state.applications.map(x=> x._id===a._id?{...x,stage:"Rejected"}:x);
            this.setState({applications:arr})
         })
         .catch(function(error) {
             console.log(error);
         })
    }

    async onViewSSC(a, e) {  // Add async here
      e.preventDefault();
      const token = localStorage.getItem('token');
    
      // Headers
      const config = {
        headers: {
          'Content-Type': 'application/pdf',
          // If token, add to headers
          ...(token && { 'auth-tok': token }),
        },
        responseType: 'blob', // Set response type to blob
      };
    
      console.log(a);
    
      try {
        const response = await axios.get(`http://localhost:5000/file/download/${a.appl_user_id}/ssc`, config);
    
        // Create a new Blob from the response data
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const contentDisposition = response.headers['content-disposition'];
        let fileName = 'downloadedFile.pdf'; // Default filename with .pdf extension
    
        // If Content-Disposition header is present, extract the filename
        if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
          const matches = /filename="?(.+?)"?/i.exec(contentDisposition); // Use regex to handle optional quotes
          if (matches && matches[1]) {
            fileName = matches[1];
          }
        }
    
        // Create a URL for the blob and trigger the download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); // Set the filename for download
        document.body.appendChild(link);
        link.click();
        link.remove();
    
        // Clean up the object URL
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading the file:', error);
      }
    }
    

    async onViewHSC(a, e) {  // Add async here
      e.preventDefault();
      const token = localStorage.getItem('token');
    
      // Headers
      const config = {
        headers: {
          'Content-Type': 'application/pdf',
          // If token, add to headers
          ...(token && { 'auth-tok': token }),
        },
        responseType: 'blob', // Set response type to blob
      };
    
      console.log(a);
    
      try {
        const response = await axios.get(`http://localhost:5000/file/download/${a.appl_user_id}/hsc`, config);
    
        // Create a new Blob from the response data
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const contentDisposition = response.headers['content-disposition'];
        let fileName = 'downloadedFile.pdf'; // Default filename with .pdf extension
    
        // If Content-Disposition header is present, extract the filename
        if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
          const matches = /filename="?(.+?)"?/i.exec(contentDisposition); // Use regex to handle optional quotes
          if (matches && matches[1]) {
            fileName = matches[1];
          }
        }
    
        // Create a URL for the blob and trigger the download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); // Set the filename for download
        document.body.appendChild(link);
        link.click();
        link.remove();
    
        // Clean up the object URL
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading the file:', error);
      }
    }
    

    async onViewAadhar(a, e) {  // Add async here
      e.preventDefault();
      const token = localStorage.getItem('token');
    
      // Headers
      const config = {
        headers: {
          'Content-Type': 'application/pdf',
          // If token, add to headers
          ...(token && { 'auth-tok': token }),
        },
        responseType: 'blob', // Set response type to blob
      };
    
      console.log(a);
    
      try {
        const response = await axios.get(`http://localhost:5000/file/download/${a.appl_user_id}/aadhar`, config);
    
        // Create a new Blob from the response data
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const contentDisposition = response.headers['content-disposition'];
        let fileName = 'downloadedFile.pdf'; // Default filename with .pdf extension
    
        // If Content-Disposition header is present, extract the filename
        if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
          const matches = /filename="?(.+?)"?/i.exec(contentDisposition); // Use regex to handle optional quotes
          if (matches && matches[1]) {
            fileName = matches[1];
          }
        }
    
        // Create a URL for the blob and trigger the download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); // Set the filename for download
        document.body.appendChild(link);
        link.click();
        link.remove();
    
        // Clean up the object URL
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading the file:', error);
      }
    }
    

    async onViewCET(a, e) {  // Add async here
      e.preventDefault();
      const token = localStorage.getItem('token');
    
      // Headers
      const config = {
        headers: {
          'Content-Type': 'application/pdf',
          // If token, add to headers
          ...(token && { 'auth-tok': token }),
        },
        responseType: 'blob', // Set response type to blob
      };
    
      console.log(a);
    
      try {
        const response = await axios.get(`http://localhost:5000/file/download/${a.appl_user_id}/cet`, config);
    
        // Create a new Blob from the response data
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const contentDisposition = response.headers['content-disposition'];
        let fileName = 'downloadedFile.pdf'; // Default filename with .pdf extension
    
        // If Content-Disposition header is present, extract the filename
        if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
          const matches = /filename="?(.+?)"?/i.exec(contentDisposition); // Use regex to handle optional quotes
          if (matches && matches[1]) {
            fileName = matches[1];
          }
        }
    
        // Create a URL for the blob and trigger the download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); // Set the filename for download
        document.body.appendChild(link);
        link.click();
        link.remove();
    
        // Clean up the object URL
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading the file:', error);
      }
    }
    
    

    // onShortlist(id, ind, e){  //id is the application id
    //   e.preventDefault();
    //    var token = localStorage.getItem('token');

    //     // Headers
    //     var config = {
    //       headers: {
    //         'Content-type': 'application/json'
    //       }
    //     }

    //     // If token, add to headers
    //     if (token) {
    //       config.headers['auth-tok'] = token;
    //     }
    //  axios.post('http://localhost:5000/recr/shortlist', {id:id }, config)
    //      .then(response => {
    //         var temp = this.state.applications;
    //         temp[ind] = response.data;
    //         console.log(temp);
    //         this.setState({applications:temp});
    //      })
    //      .catch(function(error) {
    //          console.log(error);
    //      })
    // }

    // async sortAlt(e){
    //   await this.setState({ [e.target.name]: e.target.value });
    //   this.sortApplic();
    // }

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
            <AdminNavbar/>
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
                                            {/* <TableCell>Merit Number</TableCell>                                     */}
                                            <TableCell>Date of Application</TableCell>
                                            <TableCell>SSC Certificate</TableCell>
                                            <TableCell>HSC Certificate</TableCell>
                                            <TableCell>Aadhar Card</TableCell>
                                            <TableCell>CET Marksheet</TableCell>
                                            <TableCell>Stage</TableCell>
                                            <TableCell>Documents Verified</TableCell>
                                            <TableCell>Fees Paid</TableCell>
                                            <TableCell>Accept</TableCell>
                                            <TableCell>Reject</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.applications.map((a,ind) => (

                                        <TableRow key={a._id}>
                                            <TableCell>{a.appl_user_id}</TableCell>
                                            {/* <TableCell>{a.appl_user_id.merit_no}</TableCell> */}
                                            <TableCell>{moment(a.date_of_appl).format('DD-MM-YYYY')}</TableCell> 
                                            <TableCell>
                                              <Button onClick={(e)=>this.onViewSSC(a, e)}>View SSC Certificate</Button>
                                            </TableCell>                
                                            <TableCell>
                                              <Button onClick={(e)=>this.onViewHSC(a, e)}>View HSC Certificate</Button>
                                            </TableCell>                 
                                            <TableCell>
                                              <Button onClick={(e)=>this.onViewAadhar(a, e)}>View Aadhar Card</Button>
                                            </TableCell>                  
                                            <TableCell>
                                              <Button onClick={(e)=>this.onViewCET(a, e)}>View CET Marksheet</Button>
                                            </TableCell>                 
                                            <TableCell>{a.stage}</TableCell>
                                            <TableCell>
                                              <Button onClick={(e)=>this.onDocsVerified(a, e)}>Status - Verify Documents</Button>
                                            </TableCell>  
                                            <TableCell>
                                              <Button onClick={(e)=>this.onFeesPaid(a, e)}>Status - Fees Paid</Button>
                                            </TableCell>  
                                            <TableCell>
                                              <Button onClick={(e)=>this.onAccept(a,e)}>Accept Application</Button>
                                            </TableCell>  
                                            <TableCell>
                                              <Button onClick={(e)=>this.onReject(a, e)}>Reject Application</Button>
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

export default AdminApplView;