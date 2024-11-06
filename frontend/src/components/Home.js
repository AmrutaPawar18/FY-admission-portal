import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the VJTI Admission Portal</h1>
      <img src='https://www.festivalsfromindia.com/wp-content/uploads/2022/04/VJTI-Mumbai.-Photo-VJTI-Mumbai-1_11zon.jpg' alt="VJTI Campus" className="vjti-image" />
      <p>Your gateway to seamless admission management.</p>

    <div className="card-container">
    <div className="card" style={{ width: '350px' }}>
    <Link to="/login" className="card-link">
        <h3>User Login/Registration</h3>
        <p>Login / register here.</p>
    </Link>
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
}

export default Home;