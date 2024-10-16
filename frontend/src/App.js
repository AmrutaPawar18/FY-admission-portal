import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Home from './components/Home.js'

import ApplHome from './components/ApplHome.js'
import Register from './components/Register.js'
import Login from './components/Login.js'
import ApplDash from './components/ApplDashStatus.js'
import ApplForm from './components/ApplForm.js'
import DocUpload from './components/ApplDocumentUpload.js';

import AdminDashboard from './components/AdminHome.js';
import AdminApplView from './components/AdminApplicationsView.js';
import CoursesView from './components/AdminCoursesView.js';
import Analytics from './components/AdminAnalytics.js';

import NotFound from './components/NotFound.js'

// import acreateProfile from './components/RegPart2Appl.js'
// import rcreateProfile from './components/RegPart2Recr.js'
// import createJob from './components/createJob.js'
// import aProfile from './components/ApplProfile.js'
// import rProfile from './components/RecrProfile.js'
// import myAppl from './components/MyAppl.js'
// import ApplView from './components/ApplicationsView.js'
// import emp from './components/employees.js'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}/>

        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>

        <Route path="/applHome" exact component={ApplHome}/>
        <Route path="/aStatus" exact component={ApplDash}/>
        <Route path="/applForm" exact component={ApplForm}/>
        <Route path="/uploadDocs" exact component={DocUpload}/>

        <Route path="/adminDashboard" exact component={AdminDashboard}/>
        <Route path="/adminApplView" exact component={AdminApplView}/>
        <Route path="/adminCoursesView" exact component={CoursesView}/>
        <Route path="/adminAnalytics" exact component={Analytics}/>

        {/* <Route path="/adminHome" exact component={rDash}/> */}

        {/* <Route path="/acreateProfile" component={acreateProfile}/>
        <Route path="/rcreateProfile" component={rcreateProfile}/> */}
        {/* <Route path="/applications/:jobId" component={ApplView}/> */}
        {/* <Route path="/employees" component={emp}/>
        <Route path="/createJob" component={createJob}/> */}
        {/* <Route path="/aProfile" component={aProfile}/>
        <Route path="/rProfile" component={rProfile}/>
        <Route path="/myApplications" component={myAppl}/> */}

        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
