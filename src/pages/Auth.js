import React, { useRef, useState } from 'react'
import { Alert, Button, Card , Col , Form } from 'react-bootstrap'

import axios from 'axios';
import socket from '../components/Socket';

export default function Auth({setLoggedin}) {

    const [firstname , setFirstname] = useState('');
    const [lastname , setLastname] = useState('');
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');

    const [register , setRegister] = useState(false);
    const [error , setError] = useState('');

    const [page , setPage] = useState('login');

    function regsiterPage(){
        setPage('register')
    }

    function loginPage(){
        setPage('login')
    }

    const handleLogin = (e) => {

        e.preventDefault();

        axios.post('https://chat-app-new-cd.herokuapp.com/api/auth/login' , {username: username , password: password})
            .then(res => {
                console.log(res.data.uid);
                if(res.data.uid){
                    localStorage.setItem('user' , res.data.uid);
                    localStorage.setItem('loggedin' , true)
                    socket.emit('login' , res.data.uid);
                    setLoggedin(true);
                }else{
                    setError('Username or password are not correct')
                }
            })
            .catch(err => {
                console.log(err);
            });

    };

    const handleRegister = (e) => {

        e.preventDefault();

        axios.post('https://chat-app-new-cd.herokuapp.com/api/users/create' , {firstname: firstname , lastname: lastname , username: username , password: password})
        .then(res => {
            setRegister(true);
        })
        .catch(err => {
            console.log(err);
        })

    };

    return (
        <>
            <div className='d-flex vh-100 justify-content-center align-items-center'>
                <Col xs="2">
                    <Card>
                        <Card.Body>
                            {
                                page == 'login' ? (

                                    <Form onSubmit={handleLogin}>
                                        {error != '' ? (<Alert variant="danger">{error}</Alert>) : ''}
                                        <Form.Group className="mb-2">
                                            <Form.Label>Username *</Form.Label>
                                            <Form.Control type="text" required value={username} onChange={e => setUsername(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Password *</Form.Label>
                                            <Form.Control type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                                        </Form.Group>
                                        <div className="d-grid gap-2">
                                            <Button type="submit" variant="primary">LOGIN</Button>
                                            <Button variant="secondary" onClick={regsiterPage}>REGISTER</Button>
                                        </div>
                                    </Form>

                                ) : (

                                    <Form onSubmit={handleRegister}>
                                        {register ? (<Alert variant="success">Successfully registered please login</Alert>) : ''}                                                                        
                                        <Form.Group className="mb-2">
                                            <Form.Label>First Name *</Form.Label>
                                            <Form.Control type="text" required value={firstname} onChange={e => setFirstname(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-2">
                                            <Form.Label>Last Name *</Form.Label>
                                            <Form.Control type="text" required value={lastname} onChange={e => setLastname(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-2">
                                            <Form.Label>Username *</Form.Label>
                                            <Form.Control type="text" required value={username} onChange={e => setUsername(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Password *</Form.Label>
                                            <Form.Control type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                                        </Form.Group>
                                        <div className="d-grid gap-2">
                                            <Button type="submit" variant="primary">REGISTER</Button>
                                            <Button variant="secondary" onClick={loginPage}>BACK TO LOGIN</Button>
                                        </div>
                                    </Form>

                                )
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </div>
        </>
    )
}
