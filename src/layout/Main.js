import React , {useState} from 'react'
import {Container, Row, Col, Navbar , NavDropdown, Nav, NavbarBrand} from 'react-bootstrap';
import { Route, Switch } from 'react-router';
import Navigation from '../components/Navigation';
import Chat from '../pages/Chat';
import Auth from '../pages/Auth';

import socket from '../components/Socket';

import { FiLogOut } from 'react-icons/fi';

export default function Main() {

    const [loading, setLoading] = useState(true);
    const [loggedin , setLoggedin] = useState(false);
    const [loggedOut , setloggedOut] = useState(false);

    const loggedIN = localStorage.getItem('loggedin');

    function logout(){
        setloggedOut(true);
        socket.emit('logout' , localStorage.getItem('user'));
        localStorage.removeItem('onlineusers');
        localStorage.removeItem('user');
        localStorage.removeItem('loggedin');
    }

    return (
        !loggedIN ? (

            <Container fluid>
                <Row>
                    <Auth setLoggedin={setLoggedin}/>
                </Row>
            </Container>

        ) : (

            <Container fluid>
                <Row>
                    <Navbar bg="dark" expand="lg">
                        <Nav>
                            <NavbarBrand className="text-light">
                                CHAT APP
                            </NavbarBrand>
                        </Nav>
                        <Nav className="ms-auto">
                            <Nav.Link className='text-light' onClick={logout}>
                                <FiLogOut/>
                            </Nav.Link>
                        </Nav>
                    </Navbar>
                </Row>
                <Row>
                    <Col xs="1" className="height-full bg-dark p-0">
                        <Navigation/>
                    </Col>
                    <Col xs="11" className="bg-light d-flex flex-column flex-grow">
                        <Switch>
                            <Route path='/chat/' exact component={() => (<Chat loading={loading} setLoading={setLoading}/>)}/>
                            <Route path='/chat/:uid' exact component={() => (<Chat loading={loading} setLoading={setLoading}/>)}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>

        )
    )
}
