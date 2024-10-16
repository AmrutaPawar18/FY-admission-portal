// src/pages/Home.js
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import ApplNavbar from './ApplNavbar';

class ApplHome extends Component{

  constructor(props) {
    super(props);
  };

  render() {

   return (
    <div>
    <ApplNavbar/>
    <div className="home-container">
      <h1>Welcome to the VJTI Admission Portal</h1>
      <img src='https://www.festivalsfromindia.com/wp-content/uploads/2022/04/VJTI-Mumbai.-Photo-VJTI-Mumbai-1_11zon.jpg' alt="VJTI Campus" className="vjti-image" />
      <p>Your gateway to seamless admission management.</p>

      <div className="card-container">

        <div className="card">
          <Link to="/applForm" className="card-link">
            <h3>Application Form</h3>
            <p>Fill out the admission form.</p>
          </Link>
        </div>

        <div className="card">
          <Link to="/uploadDocs" className="card-link">
            <h3>Document Upload</h3>
            <p>Submit your required documents.</p>
          </Link>
        </div>

        <div className="card">
          <Link to="/aStatus" className="card-link">
            <h3>Application Status</h3>
            <p>Check your current application status.</p>
          </Link>
        </div>

        <div className="card">
          <a href="https://www.onlinesbi.sbi/sbicollect/icollecthome.htm" className="card-link">
            <h3>Fee Payment</h3>
            <p>Pay your admission fees online.</p>
          </a>
        </div>

        {/* <div className="card">
          <Link to="/login" className="card-link">
            <h3>Admin Dashboard</h3>
            <p>Manage admissions as an administrator.</p>
          </Link>
        </div>

        <div className="card">
          <Link to="/analytics" className="card-link">
            <h3>Analytics</h3>
            <p>View admission data and trends.</p>
          </Link>
        </div> */}
      </div>

      <div className="info-section">
        <h2>Why Choose VJTI?</h2>
        <ul>
          <li><b>Top-Ranked Institution</b>: VJTI is recognized for its academic excellence and innovation.</li>
          <li><b>Comprehensive Programs</b>: We offer a variety of programs to cater to diverse educational needs.</li>
          <li><b>Global Exposure</b>: Opportunities for international collaborations and internships.</li>
          <li><b>Supportive Community</b>: Our dedicated staff and alumni network are here to guide you.</li>
        </ul>
      </div>
    </div>
    </div>
  );
  }}

export default ApplHome;