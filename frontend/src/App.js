import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Home from './components/Home.js'
import acreateProfile from './components/RegPart2Appl.js'
import rcreateProfile from './components/RegPart2Recr.js'
import Register from './components/Register.js'
import path from './components/ApplDash.js'
import rDash from './components/RecrDash.js'
import createJob from './components/createJob.js'
import aProfile from './components/ApplProfile.js'
import rProfile from './components/RecrProfile.js'
import myAppl from './components/MyAppl.js'
import ApplView from './components/ApplicationsView.js'
import emp from './components/employees.js'
import NotFound from './components/NotFound.js'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/register" component={Register}/>
        <Route path="/acreateProfile" component={acreateProfile}/>
        <Route path="/rcreateProfile" component={rcreateProfile}/>
        <Route path="/aDashboard" component={path}/>
        <Route path="/rDashboard" component={rDash}/>
        <Route path="/applications/:jobId" component={ApplView}/>
        <Route path="/employees" component={emp}/>
        <Route path="/createJob" component={createJob}/>
        <Route path="/aProfile" component={aProfile}/>
        <Route path="/rProfile" component={rProfile}/>
        <Route path="/myApplications" component={myAppl}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
