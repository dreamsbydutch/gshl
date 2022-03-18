import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './Navbar.css';


function NavBar() {
    return (
        <Navbar bg="light" expand="md">
            <Container className='navbar-container'>
                <Navbar.Brand href="/gshl">
                    <img alt="PGC logo" src="https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/logo512.png" height="50" width="50" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/gshl">Home</Nav.Link>
                        <Nav.Link aria-controls="basic-navbar-nav" href="/gshl#/schedule">Schedule</Nav.Link>
                        <Nav.Link aria-controls="basic-navbar-nav" href="/gshl#/standings">Standings</Nav.Link>
                        <Nav.Link aria-controls="basic-navbar-nav" href="/gshl#/lockerroom">Locker Room</Nav.Link>
                        <Nav.Link aria-controls="basic-navbar-nav" href="/gshl#/leagueoffice">League Office</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;
