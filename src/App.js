import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import MobileNavbar from './components/Navbar/MobileNavbar';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Standings from './pages/Standings/Standings';
import Schedule from './pages/Schedule/Schedule';
import LeagueOffice from './pages/LeagueOffice/LeagueOffice';
import LockerRoom from './pages/LockerRoom/LockerRoom';
import ErrorPage from './utils/ErrorPage/ErrorPage'
import ScrollToTop from './utils/ScrollToTop/ScrollToTop'



function App() {
  return (
    <Router>
      <ScrollToTop />
      {window.innerWidth < 801 ? <><MobileNavbar /></> : <Navbar />}
      <div className='main-page-container'>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/lockerroom" element={<LockerRoom />} />
          <Route path="/leagueoffice" element={<LeagueOffice />} />
          <Route path="/matchup/:id" element={<LeagueOffice />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      {window.innerWidth < 801 ? <div style={{ 'color': '#var(--mainWhite)' }}>.</div> : <Footer />}
    </Router >
  );
}

export default App;
