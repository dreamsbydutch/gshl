import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import MobileNavbar from "./components/MobileNavbar";
// import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import ErrorPage from "./components/ErrorPage";

import Home from "./pages/Home";
import Standings from "./pages/Standings";
import Schedule from "./pages/Schedule";
import LeagueOffice from "./pages/LeagueOffice";
import LockerRoom from "./pages/LockerRoom";
import MatchupPage from "./pages/MatchupPage";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      {window.innerWidth < 800 ? <MobileNavbar /> : <MobileNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/lockerroom" element={<LockerRoom />} />
        <Route path="/lockerroom/:teamID" element={<LockerRoom />} />
        <Route path="/leagueoffice" element={<LeagueOffice />} />
        <Route path="/matchup/:id" element={<MatchupPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {window.innerWidth < 850 ? (
        <div className=" mb-16 text-white">.</div>
      ) : (
        <Footer />
      )}
    </Router>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
