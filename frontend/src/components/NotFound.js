import React, {Component} from 'react';
import {Paper, Container, Typography} from '@material-ui/core'

export default class nf extends Component {
    
    constructor(props) {
        super(props);
        
    }

    componentDidMount() {

    }

    render() {
        return (
            <Container style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Typography variant="h4">
                404 Not Found!
            </Typography>
           </Container>
        )
    }
}