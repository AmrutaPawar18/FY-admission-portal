import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleLogout } from 'react-google-login';

export default class ApplNavbar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // Define professional-looking color palette
        const navbarStyle = {
            backgroundColor: '#1a1a1a', // Dark gray for the navbar
            padding: '15px 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '60px'
        };

        const logoStyle = {
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
            transition: 'color 0.3s ease',
        };

        const navLinkHover = {
            color: '#f5f5f5', // Slightly lighter gray on hover
        };

        const buttonStyle = {
            color: '#f0f0f0', // Light color for the button text
            backgroundColor: '#444', // Dark gray button for Logout
            borderRadius: '4px',
            padding: '8px 16px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
        };

        const buttonHoverStyle = {
            backgroundColor: '#555', // Slightly lighter shade on hover
        };

        return (
            <div>
                <nav style={navbarStyle}>
                    <Link to="/applHome" style={logoStyle}>VJTI Portal</Link>

                    <div id="navbarToggler" style={{ display: 'flex' }}>
                        <ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0 }}>
                            <li style={{ marginRight: '20px' }}>
                                <Link 
                                    to="/applForm" 
                                    style={navLinkStyle} 
                                    onMouseOver={(e) => e.target.style.color = navLinkHover.color}
                                    onMouseOut={(e) => e.target.style.color = navLinkStyle.color}
                                >
                                    Application Form
                                </Link>
                            </li>
                            <li style={{ marginRight: '20px' }}>
                                <Link 
                                    to="/uploadDocs" 
                                    style={navLinkStyle} 
                                    onMouseOver={(e) => e.target.style.color = navLinkHover.color}
                                    onMouseOut={(e) => e.target.style.color = navLinkStyle.color}
                                >
                                    Upload Documents
                                </Link>
                            </li>
                            <li style={{ marginRight: '20px' }}>
                                <Link 
                                    to="/aStatus" 
                                    style={navLinkStyle} 
                                    onMouseOver={(e) => e.target.style.color = navLinkHover.color}
                                    onMouseOut={(e) => e.target.style.color = navLinkStyle.color}
                                >
                                    Application Status
                                </Link>
                            </li>
                            <li style={{ marginRight: '20px' }}>
                                <a 
                                    href="https://www.onlinesbi.sbi/sbicollect/icollecthome.htm" 
                                    style={navLinkStyle} 
                                    onMouseOver={(e) => e.target.style.color = navLinkHover.color}
                                    onMouseOut={(e) => e.target.style.color = navLinkStyle.color}
                                >
                                    Fee Payment
                                </a>
                            </li>
                            <li>
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
