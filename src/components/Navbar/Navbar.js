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
                        <NavDropdown title="Teams" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="/gshl#/tournament/11">Auto Draft All-Stars</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/tournament/10">Butabi Brothers</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/tournament/9">Dirty F & Gs</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/tournament/6">Dutch Rudders</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/tournament/2">Robert Thomas</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/tournament/3">Sauce Puck</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/tournament/4">The Poo Balances</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/tournament/14">Toronto Maple Reg's</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/gshl#/tournament/5">Ben Eagers Hands</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/tournament/7">Blazer Dri</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/tournament/8">Hubie's Beauties</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/tournament/1">Oxford Dandellions</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/tournament/12">Peps</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/tournament/13">The Juggernaut</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/tournament/15">THE WAUPOOS FLASH</NavDropdown.Item>
                            <NavDropdown.Item href="/gshl#/tournament/7">Your Buds</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;
