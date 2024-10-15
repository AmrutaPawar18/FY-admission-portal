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

export default class DocUpload extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            
            ssc_cert:null,
            hsc_cert:null,
            aadhar:null,
            cet:null,
            openFile:false,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        // this.onEduChange = this.onEduChange.bind(this);
        this.handleClose= this.handleClose.bind(this);
        // this.handleDiaSubmit = this.handleDiaSubmit.bind(this);
        this.onIntInputChange = this.onIntInputChange.bind(this);
        // this.uploadPic = this.uploadPic.bind(this);
        this.onSSCChange = this.onSSCChange.bind(this);
        this.onHSCChange = this.onHSCChange.bind(this);
        this.onAadharChange = this.onAadharChange.bind(this);
        this.onCETChange = this.onCETChange.bind(this);
    }


    handleClose(e){
      e.preventDefault();
      this.setState({
        ssc_cert:null,
        hsc_cert:null,
        aadhar:null,
        cet:null,
        open:false
      });
    }

    // handleDiaSubmit(e){
    //   e.preventDefault();
    //   var x = {
    //     insti_name:this.state.insti_name,
    //     start_year:this.state.start_year,
    //     end_year:this.state.end_year
    //   }
    //   console.log(x);
    //   if(x.insti_name!=='' && x.start_year!==''){
    //     if(parseInt(x.start_year)>parseInt(x.end_year)){
    //       alert("End year cannot be less than Start year");
    //       return;
    //     }
    //     if(x.start_year>2100 || x.start_year<1900){
    //       alert("Invalid start year")
    //       return;
    //     }
    //     if(x.end_year){
    //       console.log(x.end_year+" hi")
    //       if(x.end_year>2100|| x.end_year<1900){
    //         alert("Invalid end year")
    //         return;
    //       }
    //     }
    //     var y = this.state.education;
    //     y.push(x);
    //     this.setState({
    //       education: y,
    //       start_year:(new Date()).getFullYear(),
    //       end_year:'',
    //       insti_name:'',
    //       open:false
    //     });
    //   }
    //   else{
    //     alert("Institute name and start year are compulsory");
        
    //   }
    // }

    onInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    // onEduChange(event) {
    //     var x = {...this.state.education};
    //     var y = x.education;
    // }

    // onChangeEmail(event) {
    //     this.setState({ email: event.target.value });
    // }

    // onChangePwd(event) {
    //     this.setState({ pwd: event.target.value });
    // }

    onSubmit(e) {
        e.preventDefault();
        
          var b=1;

          var docs = {
            ssc_cert:this.state.ssc_cert,
            hsc_cert:this.state.hsc_cert,
            aadhar:this.state.aadhar,
            cet:this.state.cet,
          }

          // this.state.education.forEach(function(x,i){
          //   if(x.insti_name!=='' && x.start_year!==''){
          //     if(parseInt(x.start_year)>parseInt(x.end_year)){
          //       alert("End year cannot be less than Start year for education entry" + (i+1));
          //       b=0;
          //       return;
          //     }
          //     if(x.start_year>2100 || x.start_year<1900){
          //       alert(`Invalid start year for education no. ${i+1}`)
          //       b=0;
          //       return;
          //     }
          //     if(!x.end_year){ 
          //       prof.education[i].end_year=null;
          //     }
          //     else{
          //       if(x.end_year>2100|| x.end_year<1900){
          //         alert(`Invalid end year for education entry ${i+1}`)
          //         b=0;
          //         return;
          //       }
          //     }
          //     // console.log("hi");
              
          //   }
          //   else{
          //     alert("Institute name and start year are compulsory. Check entry"+(i+1));
          //     b=0;
          //     return;
          //   }
          //   // console.log("ji")
          // });

          // if(!b) return
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

          console.log(docs);

          axios.post('http://localhost:5000/file/upload', docs, config)
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

    async onSSCChange(e) {
      console.log("file\n"+e.target.files[0])
      let uploadedFile=e.target.files[0];
      var prev=''
      const fileReader = new FileReader();
      fileReader.onload = () => {
        prev=fileReader.result;
      };

      fileReader.readAsDataURL(uploadedFile);
      console.log(prev)
      console.log("match\n"+uploadedFile.name.match(/\.(docx|txt|pdf)$/))
      this.setState({
        ssc_cert:uploadedFile,
      })
      
    }

    async onHSCChange(e) {
      console.log("file\n"+e.target.files[0])
      let uploadedFile=e.target.files[0];
      var prev=''
      const fileReader = new FileReader();
      fileReader.onload = () => {
        prev=fileReader.result;
      };

      fileReader.readAsDataURL(uploadedFile);
      console.log(prev)
      console.log("match\n"+uploadedFile.name.match(/\.(docx|txt|pdf)$/))
      this.setState({
        hsc_cert:uploadedFile,
      })
      
    }

    async onAadharChange(e) {
      console.log("file\n"+e.target.files[0])
      let uploadedFile=e.target.files[0];
      var prev=''
      const fileReader = new FileReader();
      fileReader.onload = () => {
        prev=fileReader.result;
      };

      fileReader.readAsDataURL(uploadedFile);
      console.log(prev)
      console.log("match\n"+uploadedFile.name.match(/\.(docx|txt|pdf)$/))
      this.setState({
        aadhar:uploadedFile,
      })
      
    }

    async onCETChange(e) {
      console.log("file\n"+e.target.files[0])
      let uploadedFile=e.target.files[0];
      var prev=''
      const fileReader = new FileReader();
      fileReader.onload = () => {
        prev=fileReader.result;
      };

      fileReader.readAsDataURL(uploadedFile);
      console.log(prev)
      console.log("match\n"+uploadedFile.name.match(/\.(docx|txt|pdf)$/))
      this.setState({
        cet:uploadedFile,
      })
      
    }    

  //   async uploadDoc(e){
  //     e.preventDefault();
  //     // const formData = new FormData();
  //     // formData.append('myfile',this.state.file);
  //     // const config = {
  //     //     headers: {
  //     //         'content-type': 'multipart/form-data'
  //     //     }
  //     // };
  //     // axios.post("http://localhost:5000/appl/uploadPic",formData,config)
  //     //     .then((response) => {
  //     //         alert("The file is successfully uploaded");
  //     //     }).catch((error) => {
  //     // });

  //     try {
  //       const { title, description } = this.state;
  //       if (1 ||(title.trim() !== '' && description.trim() !== '')) {
  //         if (this.state.file) {
  //           const formData = new FormData();
  //           formData.append('file', this.state.file);
  //           formData.append('what', 'pic');
  //           formData.append('cv', this.state.cv);
  //           var token = localStorage.getItem('token');

  //         // Headers
  //           var config = {
  //           headers: {
  //               'Content-type': 'multipart/form-data'
  //             }
  //           }
  //           // If token, add to headers
  //           if (token) {
  //             config.headers['auth-tok'] = token;
  //           }
  //           await axios.post('http://localhost:5000/file/upload', formData, 
  //             config
  //           );

  //                 this.props.history.push("/aDashboard")
  //         } 
  // }


render() {

  return (
    <Container component="main">
      <CssBaseline/>
      <Paper style={classes.paper}>
      
        <Typography component="h1" variant="h5" style={{marginBottom:10}}>
          Document
        </Typography>
        <form>
        <div className="form-group">
          <label htmlFor="aadharCard">Upload Aadhar Card:</label>
          <input
            type="file"
            name="aadharCard"
            accept="application/pdf,image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cetMarksheet">Upload CET Marksheet:</label>
          <input
            type="file"
            name="cetMarksheet"
            accept="application/pdf,image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="hscMarksheet">Upload HSC Marksheet:</label>
          <input
            type="file"
            name="hscMarksheet"
            accept="application/pdf,image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="sscMarksheet">Upload SSC Marksheet:</label>
          <input
            type="file"
            name="sscMarksheet"
            accept="application/pdf,image/*"
            onChange={handleFileChange}
          />
        </div>

        <Button variant="contained" color="primary" className="upload-button" type="submit" onClick={this.uploadDoc}>
            Upload to Database
        </Button>
      </form>

                 
                  
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

