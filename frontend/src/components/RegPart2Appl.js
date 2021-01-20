import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

import axios from 'axios';

/**/

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
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

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            
            education:[],
            skills:[],
            predSkills:[{key:"html",name:"HTML"},{key:"css",name:"CSS"},{key:"js",name:"JS"}],
            rating:0,
            open:false,
            insti_name:'',
            start_year:(new Date()).getFullYear(),
            end_year:'',

        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onEduChange = this.onEduChange.bind(this);
        this.handleClose= this.handleClose.bind(this);
        this.handleDiaSubmit = this.handleDiaSubmit.bind(this);
        this.onIntInputChange = this.onIntInputChange.bind(this);
    }

    componentDidMount() {
     
    }

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
        open:false
      });
    }

    handleDiaSubmit(e){
      e.preventDefault();
      var x = {
        insti_name:this.state.insti_name,
        start_year:this.state.start_year,
        end_year:this.state.end_year
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
        var y = this.state.education;
        y.push(x);
        this.setState({
          education: y,
          start_year:(new Date()).getFullYear(),
          end_year:'',
          insti_name:'',
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

    onChangePwd(event) {
        this.setState({ pwd: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        
          var b=1;

          var prof = {
            education: this.state.education,
            skills: this.state.skills,
            rating:0
          }

          this.state.education.forEach(function(x,i){
            if(x.insti_name!=='' && x.start_year!==''){
              if(parseInt(x.start_year)>parseInt(x.end_year)){
                alert("End year cannot be less than Start year for education entry" + (i+1));
                b=0;
                return;
              }
              if(x.start_year>2100 || x.start_year<1900){
                alert(`Invalid start year for education no. ${i+1}`)
                b=0;
                return;
              }
              if(!x.end_year){ 
                prof.education[i].end_year=null;
              }
              else{
                if(x.end_year>2100|| x.end_year<1900){
                  alert(`Invalid end year for education entry ${i+1}`)
                  b=0;
                  return;
                }
              }
              // console.log("hi");
              
            }
            else{
              alert("Institute name and start year are compulsory. Check entry"+(i+1));
              b=0;
              return;
            }
            // console.log("ji")
          });
          if(!b) return
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

          console.log(prof);

          axios.post('http://localhost:5000/appl/newProfile', prof, config)
               .then(res => {
                  alert("Added!");
                  this.setState({edit:false});
                  this.props.history.push("/aDashboard")
                })
               .catch(err => {
                  if(err.response){
                    if(err.response.data.error)
                      console.log(err.response.data.error)
                    else
                      console.log(err.message);
                  }
                  
                  else
                    console.log(err.message);             
               });
          
    }

render() {
  console.log(this.state.predSkills);

  return (
    <Container component="main">
      <CssBaseline/>
      <Paper style={classes.paper}>
      
        <Typography component="h1" variant="h5" style={{marginBottom:10}}>
          Profile
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
                    defaultValue={(new Date()).getFullYear()}
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


        
        <form style={classes.form} onSubmit={this.onSubmit} noValidate>
        You must fill this form to continue
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
            <Typography>Education:</Typography>
            
              <FormControl variant="outlined" required fullWidth>
              <ol>
                {this.state.education.map((edu,ind)=>(
                  <li>
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
                  name="start_year"
                  label="Start Year"
                  id="start_year"
                  value={edu.start_year}
                  type="number"
                  
                  onChange={(e)=>{
                      var temp = this.state.education; 
                      temp[ind].start_year = parseInt(e.target.value)||(new Date()).getFullYear(); 
                      this.setState({education:temp})
                    }}
                />
                </Grid>
                  <Grid item xs={6} md={3}>
                <TextField
                  variant="filled"
                  name="end_year"
                    fullWidth
                  label="End Year"
                  id="end_year"
                  value={edu.end_year}
                  type="number"
                  onChange={(e)=>{
                      var temp = this.state.education; 
                      temp[ind].end_year = parseInt(e.target.value)||""; 
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

              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="tags-filled"
                options={this.state.predSkills}
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
                onChange={(event, newValue) => {
                  console.log("onchange")
                  console.log(newValue)
                  var pred = this.state.predSkills;
                  var x = this.state.skills;
                  var p=[];var s=[];

                  newValue.forEach((val,i)=>{
                    console.log(val)
                    if(typeof val==='string'){  //option wasnt selected, directly pressed enter
                      
                      var predInd = pred.findIndex((it)=>it.key===val.toLowerCase());
                      if(predInd!==-1){  //present in predSkills
                        var skiInd = s.findIndex((it)=>it.key===val.toLowerCase());
                        if(skiInd!==-1){  //present in s

                        }
                        else{
                          s.push({key:val.toLowerCase(),name:val});

                        }
                      }
                      else{
                        s.push({key:val.toLowerCase(),name:val});
                        pred.push({key:val.toLowerCase(),name:val});
                      }
                      
                    }
                    else if(val && val.name){
                      if(val.key!==val.name.toLowerCase()){ //add "" got selected
                        pred.push({key:val.key.toLowerCase(), name:val.key});
                        s.push({key:val.key.toLowerCase(), name:val.key});
                        
                      }
                      else{
                      //  p.push({key:val.name.toLowerCase(), name:val.name});
                        var skiInd = s.findIndex((it)=>it.key===val.key.toLowerCase());
                        if(skiInd!==-1){  //present in s

                        }
                        else{
                          s.push({key:val.name.toLowerCase(), name:val.name});
                        }
                      }
                    }
                    else {
                    //  p.push({key:val.name.toLowerCase(), name:val.name});
                      var skiInd = s.findIndex((it)=>it.key===val.toLowerCase());
                        if(skiInd!==-1){  //present in s

                        }
                        else{
                          s.push({key:val.name.toLowerCase(), name:val.name});
                        }
                    }

                  });
                  console.log(pred);
                  this.setState({
                    skills:s,
                    predSkills:pred
                  })


                  
                  console.log("onchange")

              }}
                freeSolo
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  console.log("filtered" + filtered)
                  // Suggest the creation of a new value
                  if (params.inputValue !== '') {
                    var skiInd = filtered.findIndex((it)=>it.key===params.inputValue.toLowerCase());
                        if(skiInd!==-1){  //present in options

                        }
                        else{
                    filtered.push({
                      key: params.inputValue.toLowerCase(),
                      name: `Add "${params.inputValue}"`,
                    });}
                  }

                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                //filterSelectedOptions//removes already selected options
                renderTags={(value, getTagProps) =>
                  
                  this.state.skills.map((option, index) => 
                  
                    <Chip variant="outlined" key={option.name.toLowerCase()} label={option.name} {...getTagProps({ index })} />
                  )
                  
                }
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Skills" placeholder="Add a skill"/>
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
          Update Profile
          </Button>

        </form>
      </Paper>
    </Container>
  );
}
}

