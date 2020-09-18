import React from 'react';
import { Collapse, Container, Navbar, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { LOGIN, REGISTER, HOME, LOGOUT } from '../constants';

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
                                            <NavLink tag={Link} className="text-dark" to="/redirect">Redirect</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark" to="/zoom">Zoom</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark" to={`${LOGIN}`}>Login</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark" to={`${REGISTER}`}>Register</NavLink>
                                        </NavItem>

                                    </>
                                        :
                                        <>
                                            <NavItem>
                                                <NavLink tag={Link} className="text-dark" to={`${HOME}`}>Home</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink tag={Link} className="text-dark" to={`${LOGOUT}`}>Logout</NavLink>
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
