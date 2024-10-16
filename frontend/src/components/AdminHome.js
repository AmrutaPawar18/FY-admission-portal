// src/pages/AdminDashboard.js
import React, {Component} from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

class AdminDashboard extends Component {
    
  constructor(props) {
      super(props);
  }

  render() {
  return (
    <div>
      <AdminNavbar/>
    <div className="container">
      <h2>Admin Dashboard</h2>
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Applications</h3>
          <p>500</p>
        </div>
        <div className="stat-card">
          <h3>Pending Applications</h3>
          <p>200</p>
        </div>
        <div className="stat-card">
          <h3>Approved Applications</h3>
          <p>300</p>
        </div>
        <div className="stat-card">
          <h3>Rejected Applications</h3>
          <p>50</p>
        </div>
        <div className="stat-card">
          <h3>Total Fees Collected</h3>
          <p>₹ 2,00,000</p>
        </div>
      </div>

      <div className="card">
          <Link to="/adminApplView" className="card-link">
            <h3>View Applications</h3>
            <p>View Applications of Students</p>
          </Link>
    </div>
    <div className="card">
          <Link to="/adminCoursesView" className="card-link">
            <h3>View Courses</h3>
            <p>View Courses</p>
          </Link>
    </div>
    <div className="card">
          <Link to="/adminAnalytics" className="card-link">
            <h3>Analytics</h3>
            <p>View admission data and trends.</p>
          </Link>
    </div>

      <h3>Recent Activity</h3>
      <ul className="activity-list">
        <li>Dev Bhuva submitted an application.</li>
        <li>Documents verified for Gauravi Patil.</li>
        <li>Fee payment received from Amruta Pawar.</li>
        <li>Netra Patel uploaded additional documents.</li>
      </ul>

    </div>
    </div>
  );
}
}

export default AdminDashboard;