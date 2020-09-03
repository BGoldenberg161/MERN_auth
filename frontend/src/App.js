import React from 'react';
import './App.css';
import Welcome from './components/Welcome'
import About from './components/About'
import Footer from './components/Footer'
import NavBar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Welcome />
      <Footer />
    </div>
  );
}

export default App;
