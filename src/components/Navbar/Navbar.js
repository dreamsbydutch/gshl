import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


function NavBar() {
    return (
        <div className='desktop-navbar'>
            <div className='desktop-navbar-container'>
                <Link to="">
                    <img alt="PGC logo" src="https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/logo512.png" height="50" width="50" />
                    Home
                </Link>
                <Link to="/schedule">Schedule</Link>
                <Link to="/standings">Standings</Link>
                <Link to="/lockerroom">Locker Room</Link>
                <Link to="/leagueoffice">League Office</Link>
            </div>
        </div>
    )
}

export default NavBar;
