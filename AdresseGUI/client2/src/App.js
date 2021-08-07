import React from 'react';
import logo from './logo.svg';
import './App.css';
import ZipCode from './Components/ZipCode'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ZipCode/>
      </header>
    </div>
  );
}

export default App;
