import React, {Component} from 'react';
import im from '../static/bk9.png';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import ApplNavbar from './ApplNavbar.js';
import axios from 'axios';

/**/

var hi = []

const classes = {
    paper: {
      padding:'5%', 
      justifyContent:'center', 
      alignItems:'center', 
      display:'flex', 
      flexDirection:'column', 
      marginTop:'10%'    
    },
    avatar: {
      margin: 10,
      alignSelf: 'center',
      backgroundColor: 'red',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: 1,
    },
    submit: {
      marginBottom: 10,
      marginTop: 10,
    },
  };

const conf = {
  ignoreCase:true,
  trim: true
}
const filter = createFilterOptions(conf);
  
class ApplForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            mname: '',
            lname: '',
            dob: '',
            course_title: '',
            courses: [{key:"Computer",name:"Computer Engineering"},{key:"IT",name:"Information Technology"},
                      {key:"ExTC", name:"Electronics & Telecommunications"}, {key:"Electronics",name:"Electronics Engineering"},
                      {key:"Electrical",name:"Electrical Engineering"}, {key:"Mechanical",name:"Mechanical Engineering"},
                      {key:"Production",name:"Production Engineering"}, {key:"Civil",name:"Civil Engineering"},
                      {key:"Textile",name:"Textile Engineering"}],
            contact: '',
            address: '',
            previewSrc:'',
            IsPreviewAvailable:false,
            email:'',
            education:[],
            open:false,
            insti_name:'',
            start_year:(new Date()).getFullYear(),
            end_year: '',
            perc: '',
            merit_no: ''
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePwd = this.onChangePwd.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onEduChange = this.onEduChange.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.handleClose= this.handleClose.bind(this);
        this.handleDiaSubmit = this.handleDiaSubmit.bind(this);
        this.onIntInputChange = this.onIntInputChange.bind(this);
    }

    // async componentDidMount() {
    //   var token = localStorage.getItem('token');

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

    //     await axios.get('http://localhost:5000/appl/profile', config)
    //          .then(res => {
    //           // console.log(res.data.pic_path);
    //           this.setState({
    //             fname: res.data.user_id.fname,
    //             lname: res.data.user_id.lname,
    //             email: res.data.user_id.email,
    //             education: res.data.education,
    //           })

    //         })
    //          .catch(err=>{
    //           if(err.response){
    //             if(err.response.data.error)
    //               console.log(err.response.data.error)
    //             else
    //               console.log(err.message);
    //           }
    //           else
    //             console.log(err.message);
    //          });
    // }

    onIntInputChange(e) {
      var yr = parseInt(e.target.value)
      this.setState({ [e.target.name] : yr})
    }

    handleClose(e){
      e.preventDefault();
      this.setState({
        start_year:(new Date()).getFullYear(),
        end_year:'',
        insti_name:'',
        perc: '',
        open:false
      });
    }

    handleDiaSubmit(e){
      e.preventDefault();
      var x = {
        insti_name:this.state.insti_name,
        start_year:this.state.start_year,
        end_year:this.state.end_year,
        percentage:this.state.perc
      }
      console.log(x);
      if(x.insti_name!=='' && x.start_year!==''){
        if(parseInt(x.start_year)>parseInt(x.end_year)){
          alert("End year cannot be less than Start year");
          return;
        }
        if(x.start_year>2100 || x.start_year<1900){
          alert("Invalid start year")
          return;
        }
        if(x.end_year){
          console.log(x.end_year+" hi")
          if(x.end_year>2100|| x.end_year<1900){
            alert("Invalid end year")
            return;
          }
        }
        // if (x.percentage < 0 || x.percentage > 100) {
        //   alert("Invalid percentage")
        //   return;
        // }
        var y = this.state.education;
        y.push(x);
        this.setState({
          education: y,
          start_year:(new Date()).getFullYear(),
          end_year:'',
          insti_name:'',
          percentage: '',
          open:false
        });
      }
      else{
        alert("Institute name and start year are compulsory");
      }
    }

    onInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onEduChange(event) {
        var x = {...this.state.education};
        var y = x.education;
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangeAddress(event) {
      this.setState({ address: event.target.value });
    }

    onChangePwd(event) {
        this.setState({ pwd: event.target.value });
    }

    async onSubmit(e) {
        e.preventDefault();
          var data = {
            fname: this.state.fname,
            mname: this.state.mname,
            lname: this.state.lname,
            dob: this.state.dob,
            course_title: this.state.course_title,
            contact: this.state.contact,
            email: this.state.email,
            address: this.state.address,
            education: this.state.education,
            merit_no: this.state.merit_no
          }

          this.state.education.forEach(function(x,i){
            if(x.insti_name!=='' && x.start_year!==''){
              if(parseInt(x.start_year)>parseInt(x.end_year)){
                alert("End year cannot be less than Start year for education entry " + (i+1));
                return;
              }
              if(x.start_year>2100 || x.start_year<1900){
                alert(`Invalid start year for education no. ${i+1}`)
                return;
              }
              if(!x.end_year){ 
                data.education[i].end_year=null;
              }
              // if(!x.percentage || (x.percentage<0 || x.percentage > 100)) {
              //   alert(`Invalid or missing percentage value for education no. ${i+1}`)
              //   return;
              // }
              else{
                if(x.end_year>2100|| x.end_year<1900){
                  alert(`Invalid end year for education entry ${i+1}`)
                  return;
                }
              }
              // console.log("hi");
              
            }
            else{
              alert("Institute name, percentage and start year are compulsory. Check entry "+(i+1));
              return;
            }
            // console.log("ji")
          });
          // console.log("ki")
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

          
          // console.log(prof);
          var c=0;
          axios.post('http://localhost:5000/appl/apply', data, config)
          .then(response => {
            alert(response.data.message);
            this.props.history.push('/uploadDocs');
          })
          .catch(function(error) {
            console.log(error);
            alert("Something went wrong. Please try again");
          })
        };

render() {

  return (
    <div>
    <ApplNavbar name={this.state.fname+" "+this.state.lname}/>
    <Container component="main">
      <CssBaseline/>
      <Paper style={classes.paper}>
      
        <Typography component="h1" variant="h5" style={{marginBottom:10}}>
          Application Form
        </Typography>

              <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Education</DialogTitle>
                <DialogContent>
                  <Grid container spacing={2}>
                  <Grid item xs={12}>
                  <TextField
                    autoFocus
                    id="insti_name"
                    label="Institute Name"
                    fullWidth
                    name= "insti_name"
                    required
                    value={this.state.insti_name}
                    onChange={ this.onInputChange}
                  />
                  </Grid>
                  <Grid item xs={6}>
                  <TextField
                    id="start_year"
                    label="Start Year"
                    name="start_year"
                    required
                    fullWidth
                    type="number"
                    value={this.state.start_year}
                    error={(parseInt(this.state.start_year)>=1900)?false:true}
                    onChange={this.onIntInputChange}
                  />
                  </Grid>
                  <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="end_year"
                    label="End Year"
                    name="end_year"
                    type="number"
                    value={this.state.end_year}
                    onChange={this.onIntInputChange}
                  />
                  </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleDiaSubmit} color="primary">
                    Add
                  </Button>
                </DialogActions>
              </Dialog>


        
        
                {/* <img src={`http://localhost:5000/${this.state.pic}`} alt="Profile Image" style={{height:250,width:250, marginBottom:10}}/> */}
        <form style={classes.form} onSubmit={this.onSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="fname"
                variant="outlined"
                required
                fullWidth
                id="fname"
                label="First Name"
                value={this.state.fname}
                onChange={this.onInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mname"
                label="Middle Name"
                name="mname"
                autoComplete="mname"
                value={this.state.mname}
                onChange={this.onInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lname"
                label="Last Name"
                name="lname"
                autoComplete="lname"
                value={this.state.lname}
                onChange={this.onInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="date"
                id="dob"
                label="Date of birth"
                name="dob"
                autoComplete="dob"
                value={this.state.dob}
                onChange={this.onInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="contact"
                label="Contact Number"
                name="contact"
                autoComplete="contact"
                value={this.state.contact}
                onChange={this.onInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={this.state.email}
                onChange={this.onInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                value={this.state.address}
                onChange={this.onInputChange}
              />
            </Grid>

            <Grid item xs={12}>
            <Typography>Education:</Typography>
            
              <FormControl variant="outlined" required fullWidth>
              <ol>
                {this.state.education.map((edu,ind)=>(
                  <li key={ind}>
                  <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                  variant="filled"
                    label="Institute Name"
                    id="insti_name"
                    value={edu.insti_name}
                    onChange={(e)=>{
                      var temp = this.state.education; 
                      temp[ind].insti_name = e.target.value; 
                      this.setState({education:temp})
                    }}
                  />
                  </Grid>
                  <Grid item xs={6} md={3}>
                <TextField
                  variant="filled"
                  required
                    fullWidth
                  label="Start Year"
                  id="start_year"
                  value={edu.start_year}
                  type="number"
                  
                  onChange={(e)=>{
                      var temp = this.state.education; 
                      if(parseInt(e.target.value))
                      temp[ind].start_year = parseInt(e.target.value); 
                      console.log(temp)
                      this.setState({education:temp})
                    }}
                />
                </Grid>
                  <Grid item xs={6} md={3}>
                <TextField
                  variant="filled"
                    fullWidth
                  label="End Year"
                  id="end_year"
                  value={!edu.end_year?"undefined":edu.end_year}
                  type="number"
                  onChange={(e)=>{
                      var temp = this.state.education; 
                      if(parseInt(e.target.value))
                      temp[ind].end_year = parseInt(e.target.value); 
                      console.log(temp)
                      this.setState({education:temp})
                    }}
                />
                </Grid>
                </Grid>
                </li>
              ))}
              </ol>
              <Grid item xs={12}>
                <Button onClick={(e)=> {e.preventDefault(); this.setState({open:true})}}>+ Add education</Button>
              </Grid>

              <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="merit_no"
                label="Merit Number in Entrance Test"
                name="merit_no"
                autoComplete="merit_no"
                value={this.state.merit_no}
                onChange={this.onInputChange}
              />
            </Grid>

              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="tags-filled"
                options={this.state.courses}
                renderOption={(option) => option.name}
                getOptionLabel={(option) => {
                  // Value selected with enter, right from the input
                  if (typeof option === 'string') {
                    return option;
                  }
                  // Add "xxx" option created dynamically
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  // Regular option
                  return option.name;
                }}
                onChange={(event) => {
                  // console.log("onchange")
                  // console.log(newValue)
                  // var pred = this.state.courses;
                  // var x = this.state.course_title;
                  // var c = '';

                  // newValue.forEach((val,i)=>{
                  //   console.log(val)
                  //   if(typeof val==='string'){  //option wasnt selected, directly pressed enter
                      
                  //     var predInd = pred.findIndex((it)=>it.key.toLowerCase()===val.toLowerCase() || it.name.toLowerCase()===val.toLowerCase());
                  //     if(predInd!==-1){  //present in courses
                  //       c = pred[predInd].key;
                  //     }
                  //   }
                  // });
                  // console.log(pred);
                  this.setState({
                    course_title: this.state.courses[event.target.value].name
                  })
                  
                  // console.log("onchange")

              }}
                freeSolo
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                //filterSelectedOptions//removes already selected options
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Course" placeholder="Select Course"/>
                )}
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={classes.submit}
          >
          Submit
          </Button>

        </form>
      </Paper>
    </Container>
    </div>
  );
}
}

export default ApplForm;