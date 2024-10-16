// src/pages/Analytics.js
import React, {Component} from 'react';
// import { Bar, Pie } from 'react-chartjs-2';
// import { Chart, registerables } from 'chart.js';
import './styles.css';
import AdminNavbar from './AdminNavbar';

// Chart.register(...registerables); // Register all necessary components

const barData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Applications per Month',
      data: [65, 59, 80, 81, 56],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
  ],
};

const pieData = {
  labels: ['Accepted', 'Pending', 'Rejected'],
  datasets: [
    {
      label: 'Application Status',
      data: [300, 50, 100],
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)',
      ],
    },
  ],
};

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false, // Allow custom height and width
};

class Analytics extends Component {
    
  constructor(props) {
      super(props);
  }

  render() {
  return (
    <div>
      <AdminNavbar/>
    <div className="container">
      <h2>Analytics</h2>
      <div className="chart-container">
        <h3>Applications Overview</h3>
        {/* <Bar data={barData} /> */}
      </div>

      <div className="chart-container pie-chart">
        <h3>Application Status Distribution</h3>
        <div className="pie-chart-wrapper">
          {/* <Pie data={pieData} options={pieOptions} /> */}
        </div>
      </div>
    </div>
    </div>
  );
} }

export default Analytics;