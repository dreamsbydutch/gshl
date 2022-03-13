import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import './App.css';

import MobileNavbar from './components/Navbar/MobileNavbar';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import Standings from './components/Standings/Standings';
import Schedule from './components/Schedule/Schedule';
import ErrorPage from './pages/ErrorPage/ErrorPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      {window.innerWidth < 850 ? <><MobileNavbar /></> : <Navbar />}
      <Container className='main-page-container'>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Schedule />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Container>
      {window.innerWidth < 850 ? <div style={{ 'color': '#fff' }}>.</div> : <Footer />}
    </Router >
  );
}

export default App;
