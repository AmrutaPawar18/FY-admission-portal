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
                alert("Submitted Successfully!")
                this.props.history.push('/applHome');
            })
            .catch((err) => {
                alert(err.response ? err.response.data.error : err.message);
            });
    };

    render() {
        const { ssc_cert, hsc_cert, aadhar, cet } = this.state;

        return (
            <Container component="main">
                <ApplNavbar />
                <CssBaseline />
                <Paper style={{ padding: '5%', marginTop: '10%' }}>
                    <Typography component="h1" variant="h5" style={{ marginBottom: 10 }}>
                        Document Upload
                    </Typography>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <Button variant="contained" color="primary" component="label">
                                Choose SSC Certificate
                                <input type="file" hidden onChange={this.handleFileChange('ssc_cert')} />
                            </Button>
                            <Typography>{ssc_cert ? ssc_cert.name : 'No file selected'}</Typography>
                        </div>

                        <div>
                            <Button variant="contained" color="primary" component="label">
                                Choose HSC Certificate
                                <input type="file" hidden onChange={this.handleFileChange('hsc_cert')} />
                            </Button>
                            <Typography>{hsc_cert ? hsc_cert.name : 'No file selected'}</Typography>
                        </div>

                        <div>
                            <Button variant="contained" color="primary" component="label">
                                Choose Aadhar Card
                                <input type="file" hidden onChange={this.handleFileChange('aadhar')} />
                            </Button>
                            <Typography>{aadhar ? aadhar.name : 'No file selected'}</Typography>
                        </div>

                        <div>
                            <Button variant="contained" color="primary" component="label">
                                Choose CET Marksheet
                                <input type="file" hidden onChange={this.handleFileChange('cet')} />
                            </Button>
                            <Typography>{cet ? cet.name : 'No file selected'}</Typography>
                        </div>

                        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }}>
                            Upload to Database
                        </Button>
                    </form>
                </Paper>
            </Container>
        );
    }
}
