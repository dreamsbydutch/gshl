import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
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
                        <NavDropdown title="Teams" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="/gshl#/teams/2">Auto Draft All-Stars</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/teams/">Butabi Brothers</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/teams/">Dirty F & Gs</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/teams/1">Dutch Rudders</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/teams/">Robert Thomas</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/teams/">Sauce Puck</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/teams/">The Poo Balances</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/teams/">Toronto Maple Reg's</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/gshl#/teams/">Ben Eagers Hands</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/teams/">Blazer Dri</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/teams/">Hubie's Beauties</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/teams/">Oxford Dandellions</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/teams/">Peps</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/teams/">The Juggernaut</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/teams/">THE WAUPOOS FLASH</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/teams/">Your Buds</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;
