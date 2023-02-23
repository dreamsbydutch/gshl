import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';


import MobileNavbar from './components/MobileNavbar';
// import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import { useCurrentWeek } from './utils/fetchData';
import Standings from './pages/Standings';
import Schedule from './pages/Schedule';
// import LeagueOffice from './pages/LeagueOffice';
import LockerRoom from './pages/LockerRoom';
import ErrorPage from './components/ErrorPage'
import ScrollToTop from './utils/ScrollToTop'
// import MatchupPage from './pages/MatchupPage';



function App() {
  const currentWeek = useCurrentWeek()
  if (!currentWeek) { return <LoadingSpinner /> }
  return (
    <Router>
      <ScrollToTop />
      {window.innerWidth < 800 ? <MobileNavbar /> : <MobileNavbar />}
        <Routes>
          <Route exact path="/" element={<Home currentWeek={currentWeek} />} />
          <Route path="/schedule" element={<Schedule currentWeek={currentWeek} />} />
          <Route path="/standings" element={<Standings currentWeek={currentWeek} />} />
          <Route path="/lockerroom" element={<LockerRoom currentWeek={currentWeek} />} />
          {/* <Route path="/leagueoffice" element={<LeagueOffice currentWeek={currentWeek} />} /> */}
          {/* <Route path="/matchup/:id" element={<MatchupPage />} /> */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      {window.innerWidth < 850 ? <div className="mb-12 text-white">.</div> : <Footer />}
    </Router >
  );
}

export default App;
