import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import logo from 'assets/logo.svg';
import './App.scss';
import Routes from "./Routes";

const App = () => (
  <div className="app">
    <header className="header">
      <img src={logo} className="logo" alt="logo" />
      <h1>idwDog</h1>
    </header>
    <Router>
      <Routes />
    </Router>
  </div>
);

export default App;
