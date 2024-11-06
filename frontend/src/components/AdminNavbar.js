import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleLogout } from 'react-google-login';

export default class AdminNavbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Define professional-looking color palette
        const navbarStyle = {
            backgroundColor: '#333', // Dark gray for the navbar
            padding: '15px 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '70px',
            borderBottom: '2px solid #444',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        };

        const brandStyle = {
            fontSize: '1.7rem',
            color: '#e0e0e0', // Soft off-white for the logo text
            fontWeight: 'bold',
            marginRight: '30px',
            textDecoration: 'none',
        };

        const navLinkStyle = {
            color: '#d3d3d3', // Light gray for the nav links
            fontSize: '1rem',
            padding: '10px 15px',
            textDecoration: 'none',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease, color 0.3s ease',
        };

        const navLinkHover = {
            backgroundColor: '#555', // Dark gray on hover
            color: '#f5f5f5', // Slightly lighter gray on hover
        };

        const buttonStyle = {
            color: '#f0f0f0', // Light color for the button text
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '18px',
            padding: '8px 15px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        };

        const buttonHoverStyle = {
            backgroundColor: '#555', // Darker shade on hover
        };

        return (
            <div>
                <nav style={navbarStyle}>
                    <Link to="/adminDashboard" style={brandStyle}>
                        VJTI Admission Portal
                    </Link>
                    <div id="navbarToggler" style={{ display: 'flex' }}>
                        <ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0 }}>
                            <li style={{ marginRight: '20px' }}>
                                <Link
                                    to="/adminApplView"
                                    style={navLinkStyle}
                                    onMouseOver={(e) => e.target.style.backgroundColor = navLinkHover.backgroundColor}
                                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                    View Applications
                                </Link>
                            </li>
                            <li style={{ marginRight: '20px' }}>
                                <Link
                                    to="/adminCoursesView"
                                    style={navLinkStyle}
                                    onMouseOver={(e) => e.target.style.backgroundColor = navLinkHover.backgroundColor}
                                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                    View Courses
                                </Link>
                            </li>
                            <li style={{ marginRight: '20px' }}>
                                <Link
                                    to="/adminAnalytics"
                                    style={navLinkStyle}
                                    onMouseOver={(e) => e.target.style.backgroundColor = navLinkHover.backgroundColor}
                                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                    View Analytics
                                </Link>
                            </li>
                            <li style={{ marginRight: '20px' }}>
                                <GoogleLogout
                                    onLogoutSuccess={(response) => {
                                        console.log(response);
                                        localStorage.removeItem('token');
                                        localStorage.removeItem('role');
                                    }}
                                    onFailure={(err) => { console.log(err); }}
                                    render={(renderProps) => (
                                        <Button
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}
                                            style={buttonStyle}
                                            onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                                            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                                        >
                                            <Link to="/" style={navLinkStyle}>
                                                Logout
                                            </Link>
                                        </Button>
                                    )}
                                    clientId="531568689114-5rg3ebcc6ciphbv6ged7m54lbj0gine5.apps.googleusercontent.com"
                                />
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}
