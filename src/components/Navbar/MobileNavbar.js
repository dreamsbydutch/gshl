import React from 'react';
import { NavLink } from 'react-router-dom';
import './MobileNavbar.css';


function NavBar() {
    return (
        <div className='mobile-navbar'>
            <div className='mobile-navbar-container'>
                <NavLink to="" activeclassname="active">
                    <img className="mobile-navbar-img" alt="GSHL logo" src="https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/logo512.png" />
                </NavLink>
                <span className='nav-border-line' />
                <NavLink to="/schedule" activeclassname="active">
                    <img className="mobile-navbar-img" alt="Schedule" src="https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/ScheduleIcon.png" />
                </NavLink>
                <span className='nav-border-line' />
                <NavLink to="/standings" activeclassname="active">
                    <img className="mobile-navbar-img" alt="Standings" src="https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/StandingsIcon.png" />
                </NavLink>
                <span className='nav-border-line' />
                <NavLink to="/lockerroom" activeclassname="active">
                    <img className="mobile-navbar-img" alt="LockerRoom" src="https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/LockerRoomIcon.png" />
                </NavLink>
                <span className='nav-border-line' />
                <NavLink to="/leagueoffice" activeclassname="active">
                    <img className="mobile-navbar-img" alt="LeagueOffice" src="https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/LeagueOfficeIcon.png" />
                </NavLink>
            </div>
        </div>
    )
}

export default NavBar;
