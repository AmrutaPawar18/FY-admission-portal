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
            file:null,
            previewSrc:'',
            IsPreviewAvailable:false,
            openFile:false,
            cv:null,

        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onEduChange = this.onEduChange.bind(this);
        this.handleClose= this.handleClose.bind(this);
        this.handleDiaSubmit = this.handleDiaSubmit.bind(this);
        this.onIntInputChange = this.onIntInputChange.bind(this);
        this.uploadPic = this.uploadPic.bind(this);
        this.onChange = this.onChange.bind(this);
        this.oncvChange = this.oncvChange.bind(this);
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
                  this.setState({edit:false,openFile:true});
                })
               .catch(err => {
                  if(err.response){
                    if(err.response.data.error)
                      alert(err.response.data.error)
                    else
                      alert(err.message);
                  }
                  
                  else
                    alert(err.message);            
               });
          
    }


    async onChange(e) {
      console.log("file\n"+e.target.files[0])
      let uploadedFile=e.target.files[0];
      var prev=''
      const fileReader = new FileReader();
      fileReader.onload = () => {
        prev=fileReader.result;
      };

      fileReader.readAsDataURL(uploadedFile);
      console.log(prev)
      console.log("match\n"+uploadedFile.name.match(/\.(jpeg|jpg|png)$/))
      this.setState({
        file:uploadedFile,
        previewSrc:prev,
        IsPreviewAvailable:uploadedFile.name.match(/\.(jpeg|jpg|png)$/)
      })
      
    }

    async oncvChange(e) {
      console.log("file\n"+e.target.files[0])
      let uploadedFile=e.target.files[0];
      var prev=''
      const fileReader = new FileReader();
      fileReader.onload = () => {
        prev=fileReader.result;
      };

      fileReader.readAsDataURL(uploadedFile);
      console.log(prev)
      console.log("match\n"+uploadedFile.name.match(/\.(jpeg|jpg|png)$/))
      this.setState({
        cv:uploadedFile,
      })
      
    }

    async uploadPic(e){
      e.preventDefault();
      // const formData = new FormData();
      // formData.append('myfile',this.state.file);
      // const config = {
      //     headers: {
      //         'content-type': 'multipart/form-data'
      //     }
      // };
      // axios.post("http://localhost:5000/appl/uploadPic",formData,config)
      //     .then((response) => {
      //         alert("The file is successfully uploaded");
      //     }).catch((error) => {
      // });

      try {
        const { title, description } = this.state;
        if (1 ||(title.trim() !== '' && description.trim() !== '')) {
          if (this.state.file) {
            const formData = new FormData();
            formData.append('file', this.state.file);
            formData.append('what', 'pic');
            formData.append('cv', this.state.cv);
            var token = localStorage.getItem('token');

          // Headers
            var config = {
            headers: {
                'Content-type': 'multipart/form-data'
              }
            }
            // If token, add to headers
            if (token) {
              config.headers['auth-tok'] = token;
            }
            await axios.post('http://localhost:5000/file/upload', formData, 
              config
            );

                  this.props.history.push("/aDashboard")
          } else {
            alert('Please select a file to add.');
          }
        } else {
          alert('Please enter all the field values.');
        }
      } catch (error) {
        error.response && alert(error.response.data);
      }
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


            <Dialog open={this.state.openFile} onClose={()=>this.setState({openFile:false})} onExited={()=>this.props.history.push('/aDashboard')} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Education</DialogTitle>
                <DialogContent>
                

                <Button variant="contained" color="primary" component="label">
                  Choose CV file
                  <input type="file" hidden onChange={this.oncvChange}/>
                </Button>
                {this.state.cv ? (
              <div className="preview-message">
                <p>{this.state.cv.name}</p>
              </div>
            
            ) : (
            <div className="preview-message">
              <p>File name will be shown here after selection</p>
            </div>
            )}


                  <Button variant="contained" color="primary" component="label">
                  Choose profile picture file
                  <input type="file" hidden onChange={this.onChange}/>
                </Button>
                {this.state.file ? (
            this.state.IsPreviewAvailable ? (
              <div className="image-preview">
                <p>{this.state.file.name}</p>
                <img className="preview-image" src={URL.createObjectURL(this.state.file)} alt="Preview" style={{height:250,width:250}}/>
              </div>
            ) : (
              <div className="preview-message">
                <p>{this.state.file.name}</p>
                <p>No preview available for this file. Pls select a png, jpg or jpeg file</p>
              </div>
            )
            ) : (
            <div className="preview-message">
              <p>Image preview will be shown here after selection</p>
            </div>
            )}
                </DialogContent>
                <DialogActions>
                 
                  <Button variant="contained" color="primary" className="upload-button" type="submit" onClick={this.uploadPic}>
                  Upload to Database
                  </Button>
                </DialogActions>
              </Dialog>
            {//   <form style={classes.form} onSubmit={this.uploadPic} noValidate>
            //     <Button variant="contained" color="primary" component="label">
            //       Choose file
            //       <input type="file" hidden onChange={this.onChange}/>
            //     </Button>
            //     {this.state.file ? (
            // this.state.IsPreviewAvailable ? (
            //   <div className="image-preview">
            //     <p>{this.state.file.name}</p>
            //     <img className="preview-image" src={URL.createObjectURL(this.state.file)} alt="Preview" style={{height:250,width:250}}/>
            //   </div>
            // ) : (
            //   <div className="preview-message">
            //     <p>{this.state.file.name}</p>
            //     <p>No preview available for this file. Pls select a png,jpg or jpeg file</p>
            //   </div>
            // )
            // ) : (
            // <div className="preview-message">
            //   <p>Image preview will be shown here after selection</p>
            // </div>
            // )}
            //           {console.log(this.state.file)}
            //           <Button variant="contained" color="primary" className="upload-button" type="submit">Upload to Database</Button>
            //     </form>
}
      </Paper>
    </Container>
  );
}
}

