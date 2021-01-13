import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Home from './components/Home.js'
import Register from './components/Register.js'

function App() {
  let history = useHistory();
  return (
    <Router>
      <div className="container">
        
        <Route path="/" exact component={Home}/>
        <Route path="/register" component={Register}/>
      </div>
    </Router>
  );
}

export default App;
