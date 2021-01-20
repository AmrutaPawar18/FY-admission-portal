import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Home from './components/Home.js'
import acompleteProfile from './components/RegPart2Appl.js'
import Register from './components/Register.js'
import path from './components/ApplDash.js'
import createJob from './components/createJob.js'
import aProfile from './components/ApplProfile.js'
import myAppl from './components/MyAppl.js'

function App() {
  return (
    <Router>
      <div className="container">
        
        <Route path="/" exact component={Home}/>
        <Route path="/register" component={Register}/>
        <Route path="/acompleteProfile" component={acompleteProfile}/>
        <Route path="/aDashboard" component={path}/>
        <Route path="/createJob" component={createJob}/>
        <Route path="/aProfile" component={aProfile}/>
        <Route path="/myApplications" component={myAppl}/>
      </div>
    </Router>
  );
}

export default App;
