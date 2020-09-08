import React, { useState, useEffect } from 'react';

import {NavLink} from 'react-router-dom'
import accountController from '../server/controller'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import {Home, User, Activity, Inbox, Settings, LogOut} from 'react-feather'

const Menu = (props) => {
    const [user, setUser] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const subscription = accountController.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    // only show nav when logged in
    console.log(user)
    if (!user) return null;

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Navbar expand="xl" className="navbar-dark">
                <div className="container h-100">
                        <NavbarBrand href="#">Logger</NavbarBrand>
                        <NavbarToggler onClick={toggle} />
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="mx-auto h-100" navbar>
                                <NavItem>
                                    <NavLink exact to="/" className="nav-link" activeClassName="active">
                                        <Home />
                                        Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/profile" className="nav-link" activeClassName="active">
                                        <User />
                                        Profile
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/activities" className="nav-link" activeClassName="active">
                                        <Activity />
                                        Activities
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/inbox" className="nav-link" activeClassName="active">
                                        <Inbox />
                                        Inbox
                                    </NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        <Settings />
                                        Settings
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <a href="#">Account</a>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <a href="#">Notifications</a>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink to="/logout" className="nav-link">
                                        <LogOut />
                                        Logout
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
            </Navbar>
        </>
  );
}

export default Menu;