import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';


import MobileNavbar from './components/MobileNavbar';
// import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Standings from './pages/Standings';
import Schedule from './pages/Schedule';
// import LeagueOffice from './pages/LeagueOffice';
import LockerRoom from './pages/LockerRoom';
import ErrorPage from './components/ErrorPage'
import ScrollToTop from './utils/ScrollToTop'
// import MatchupPage from './pages/MatchupPage';



export default function App() {
  return (
    <Router>
      <ScrollToTop />
      {window.innerWidth < 800 ? <MobileNavbar /> : <MobileNavbar />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/lockerroom" element={<LockerRoom />} />
          {/* <Route path="/leagueoffice" element={<LeagueOffice />} /> */}
          {/* <Route path="/matchup/:id" element={<MatchupPage />} /> */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      {window.innerWidth < 850 ? <div className="mb-12 text-white">.</div> : <Footer />}
    </Router >
  );
}
