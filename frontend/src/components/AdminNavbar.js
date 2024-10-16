import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button"
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleLogout } from 'react-google-login';

export default class AdminNavbar extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>                
                <nav class="navbar navbar-expand navbar-dark bg-dark">
                    <Link to="/adminDashboard" class="navbar-brand">VJTI Admission Portal</Link>
                    <div >
                        <ul class="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/adminApplView" className="nav-link">View Applications</Link>
                            </li>
                            <li class="navbar-item">
                                <Link to="/adminCoursesView" className="nav-link">View Courses</Link>
                            </li>
                            <li class="navbar-item">
                            <Link to="/adminAnalytics">View Analytics</Link>
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