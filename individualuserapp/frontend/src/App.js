import logo from './logo.svg';
import './App.css';
// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import LandingPage from './LandingPage';
import Pricing from './Pricing';
import Register from './Register';
import Footer from './Footer';
import Banner from './Banner';
function App() {
  return (
    <Router>
        <main className="">
        <Header />
     
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
        
          <Route path="/signup" element={<Register/>} />
          {/* Add more routes as needed */}
        </Routes><Footer/>
        </main>
    </Router>
  );
}

export default App;
