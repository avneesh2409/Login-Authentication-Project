import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export const NavMenu = ({ access_token }) => {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
                            <ul className="navbar-nav flex-grow">
                                {
                                    (!access_token) ? <>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark" to="/register">Register</NavLink>
                                        </NavItem>

                                    </>
                                        :
                                        <>
                                            <NavItem>
                                                <NavLink tag={Link} className="text-dark" to="/home">Home</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink tag={Link} className="text-dark" to="/sendsms">Send Sms</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink tag={Link} className="text-dark" to="/logout">Logout</NavLink>
                                            </NavItem>
                                        </>                                       
                                }

                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
}
