import logo from './logo.svg';
import './App.css';
import ZipCode from './Components/ZipCode.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ZipCode></ZipCode>
      </header>
    </div>
  );
}

export default App;
