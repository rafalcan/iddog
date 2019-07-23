import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import logo from 'assets/logo.svg';
import './App.scss';
import { AuthProvider } from 'providers/Auth';
import Routes from "./Routes";

const App = () => (
  <AuthProvider>
    <div className="app">
      <header className="header">
        <img src={logo} className="logo" title="idwDog" alt="idwDog" />
        <h1>idwDog</h1>
      </header>
      <Router>
        <Routes />
      </Router>
    </div>
  </AuthProvider>
);

export default App;
