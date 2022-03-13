import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './MobileNavbar.css';


function NavBar() {
    return (
        <Navbar bg="light" fixed="bottom">
            <Container className='navbar-container'>
                <Navbar.Brand as={Link} to="">
                    <img className="mobile-navbar-img" alt="GSHL logo" src="https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/logo512.png" />
                </Navbar.Brand>
                <span className='nav-border-line' />
                <Navbar.Brand as={Link} to="/schedule">
                    <img className="mobile-navbar-img" alt="PGC logo" src="https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/ScheduleIcon.png" />
                </Navbar.Brand>
                <span className='nav-border-line' />
                <Navbar.Brand as={Link} to="/standings">
                    <img className="mobile-navbar-img" alt="PGC logo" src="https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/StandingsIcon.png" />
                </Navbar.Brand>
                <span className='nav-border-line' />
                <Navbar.Brand as={Link} to="/lockerroom">
                    <img className="mobile-navbar-img" alt="PGC logo" src="https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/LockerRoomIcon.png" />
                </Navbar.Brand>
                <span className='nav-border-line' />
                <Navbar.Brand as={Link} to="/leagueoffice">
                    <img className="mobile-navbar-img" alt="PGC logo" src="https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/LeagueOfficeIcon.png" />
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default NavBar;
