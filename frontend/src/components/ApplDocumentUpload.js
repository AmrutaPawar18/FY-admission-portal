import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import ApplNavbar from './ApplNavbar';

export default class DocUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ssc_cert: null,
            hsc_cert: null,
            aadhar: null,
            cet: null,
        };
    }

    handleFileChange = (fileType) => (e) => {
        const uploadedFile = e.target.files[0];
        this.setState({ [fileType]: uploadedFile });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { ssc_cert, hsc_cert, aadhar, cet } = this.state;
        const docs = { ssc_cert, hsc_cert, aadhar, cet };
        const token = localStorage.getItem('token');

        const formData = new FormData();
        Object.entries(docs).forEach(([key, value]) => {
            if (value) {
                formData.append(key, value);
            }
        });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...(token && { 'auth-tok': token }),
            },
        };

        axios.post('http://localhost:5000/file/upload', formData, config)
            .then((res) => {
                alert("Submitted Successfully!");
                this.props.history.push('/applHome');
            })
            .catch((err) => {
                alert(err.response ? err.response.data.error : err.message);
            });
    };

    render() {
        const { ssc_cert, hsc_cert, aadhar, cet } = this.state;

        const styles = {
            container: {
                marginTop: '10%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop:'30px',
            },
            paper: {
                padding: '40px',
                maxWidth: '600px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                backgroundColor: '#fafafa',
                marginTop:'50px',
            },
            form: {
                width: '100%',
                marginTop: '20px',
            },
            button: {
                marginTop: '10px',
                backgroundColor: '#3f51b5',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
            },
            typography: {
                marginTop: '10px',
                marginBottom: '5px',
                color: '#555',
            },
            uploadButton: {
                marginTop: '20px',
                backgroundColor: '#4caf50',
                color: 'white',
                padding: '10px',
                borderRadius: '8px',
                width: '100%',
            },
        };

        return (
            <Container component="main" style={styles.container}>
                <ApplNavbar />
                <CssBaseline />
                <Paper style={styles.paper}>
                    <Typography component="h1" variant="h5" style={{ marginBottom: 20 }}>
                        Document Upload
                    </Typography>
                    <form onSubmit={this.handleSubmit} style={styles.form}>
                        <div>
                            <Button variant="contained" color="primary" component="label" style={styles.button}>
                                Choose SSC Certificate
                                <input type="file" hidden onChange={this.handleFileChange('ssc_cert')} />
                            </Button>
                            <Typography style={styles.typography}>
                                {ssc_cert ? ssc_cert.name : 'No file selected'}
                            </Typography>
                        </div>

                        <div>
                            <Button variant="contained" color="primary" component="label" style={styles.button}>
                                Choose HSC Certificate
                                <input type="file" hidden onChange={this.handleFileChange('hsc_cert')} />
                            </Button>
                            <Typography style={styles.typography}>
                                {hsc_cert ? hsc_cert.name : 'No file selected'}
                            </Typography>
                        </div>

                        <div>
                            <Button variant="contained" color="primary" component="label" style={styles.button}>
                                Choose Aadhar Card
                                <input type="file" hidden onChange={this.handleFileChange('aadhar')} />
                            </Button>
                            <Typography style={styles.typography}>
                                {aadhar ? aadhar.name : 'No file selected'}
                            </Typography>
                        </div>

                        <div>
                            <Button variant="contained" color="primary" component="label" style={styles.button}>
                                Choose CET Marksheet
                                <input type="file" hidden onChange={this.handleFileChange('cet')} />
                            </Button>
                            <Typography style={styles.typography}>
                                {cet ? cet.name : 'No file selected'}
                            </Typography>
                        </div>

                        <Button variant="contained" type="submit" style={styles.uploadButton}>
                            Upload to Database
                        </Button>
                    </form>
                </Paper>
            </Container>
        );
    }
}
