import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button"
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleLogout } from 'react-google-login';

export default class ApplNavbar extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>                
                <nav class="navbar sticky-top navbar-expand navbar-dark bg-dark">
                <Link to="/applHome" className="navbar-logo">VJTI Portal</Link>
              
                    <div class="navbarToggler" id="navbarToggler">
                        <ul className="navbar-nav mr-auto">
                            <li class="navbar-item">
                            <Link to="/applForm">Application Form</Link>
                            </li>
                            <li class="navbar-item">
                            <Link to="/uploadDocs">Upload Documents</Link>
                            </li>
                            <li class="navbar-item">
                            <Link to="/aStatus">Application Status</Link>
                            </li> 
                            <li>
                                <a href="https://www.onlinesbi.sbi/sbicollect/icollecthome.htm">Fee Payment</a>
                            </li>
                            <li class="navbar-item">
                                <GoogleLogout
                                  onLogoutSuccess={(response) => { console.log(response);localStorage.removeItem('token');localStorage.removeItem('role'); }}
                                  onFailure={(err)=>{console.log(err)}}
                                  render={(renderProps) => (
                                      <Button onClick={renderProps.onClick} disabled={renderProps.disabled} >
                                        <Link to="/" className="nav-link">Logout</Link>
                                      </Button>
                                    )}
                                  clientId="531568689114-5rg3ebcc6ciphbv6ged7m54lbj0gine5.apps.googleusercontent.com"
            
                                />

                            </li>  

                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}