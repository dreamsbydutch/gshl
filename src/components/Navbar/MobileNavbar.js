import React from 'react';
import { Link } from 'react-router-dom';
import './MobileNavbar.css';


function NavBar() {
    return (
        <div className='mobile-navbar'>
            <div className='mobile-navbar-container'>
                <Link to="">
                    <img className="mobile-navbar-img" alt="GSHL logo" src="https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/logo512.png" />
                </Link>
                <span className='nav-border-line' />
                <Link to="/schedule">
                    <img className="mobile-navbar-img" alt="PGC logo" src="https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/ScheduleIcon.png" />
                </Link>
                <span className='nav-border-line' />
                <Link to="/standings">
                    <img className="mobile-navbar-img" alt="PGC logo" src="https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/StandingsIcon.png" />
                </Link>
                <span className='nav-border-line' />
                <Link to="/lockerroom">
                    <img className="mobile-navbar-img" alt="PGC logo" src="https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/LockerRoomIcon.png" />
                </Link>
                <span className='nav-border-line' />
                <Link to="/leagueoffice">
                    <img className="mobile-navbar-img" alt="PGC logo" src="https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/LeagueOfficeIcon.png" />
                </Link>
            </div>
        </div>
    )
}

export default NavBar;
