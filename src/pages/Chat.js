import React, { useEffect, useState } from 'react'
import { Container , Col , Row, Badge } from 'react-bootstrap'
import ChatTopper from '../components/ChatTopper'
import ChatWindow from '../components/ChatWindow'
import axios from 'axios';

import socket from '../components/Socket';

import styled from 'styled-components'

import {NavLink , useParams} from 'react-router-dom';

export default function Chat({loading , setLoading}) {

    const params = useParams();

    const [newOnline , setnewOnline] = useState(false);
    const onlineUsers = localStorage.getItem('onlineusers') ? JSON.parse(localStorage.getItem('onlineusers')) : [];
    const [users , setUsers] = useState([]);
    const [room , setRoom] = useState([localStorage.getItem('user') , params.uid]);

    useEffect(() => {
        socket.on('getUsers' , (users) => {
            setnewOnline(true)
            localStorage.setItem('onlineusers' , JSON.stringify(users));
        });
        setnewOnline(false);
    }, [newOnline])

    useEffect(() => {
        axios.get('https://chat-app-new-cd.herokuapp.com/api/users/all').then(res => {
            let usrs = res.data;
            setUsers(usrs);
        })
    } , [params.uid]);

    useEffect(() => {
        var newRoom = [localStorage.getItem('user') , params.uid]
        if(params.uid != undefined){
            socket.emit('join' , newRoom);
            setRoom(newRoom);
        }
    } , [params.uid])

    return (
        <Container fluid className="h-100 p-0">
            <Row className="h-100">
                <Col xs="2" className="p-0 bg-white chat-left">
                    {users.filter(u => u.uid !== localStorage.getItem('user')).map(user => (
                        <ContactElement key={user.uid} className={params.uid === user.uid ? 'active' : ''}>
                            <NavLink to={'/chat/'+user.uid} />
                            <ContactElementImage src={'https://avatars.dicebear.com/api/bottts/'+user.uid+'.svg'}/>
                            <ContactElementContent>
                                <p>{user.name}</p>
                                <span>Current Status: {onlineUsers.includes(user.uid) ? <Badge className="bg-success"></Badge> :  <Badge className="bg-danger"> </Badge>}</span>
                            </ContactElementContent>
                        </ContactElement>
                    ))}
                </Col>
                <Col xs="10" className="p-0">
                    {params.uid ? (<ChatTopper Users={users} currentUID={params.uid}/>) : null}
                    <ChatWindow currentUID={params.uid} fullHeight={params.uid == undefined ? true : false}/>
                </Col>
            </Row>
        </Container>
    )
}

const ContactElement = styled.div`
    display: block;
    padding: 15px;
    cursor: pointer;
    background: none;
    transition: 0.3s ease-in-out;
    position: relative;
    border-bottom: 1px solid #eee;

    &:hover,
    &.active{
        background: #eee;
    }

    a{
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: 0px;
        left: 0px;
    }

`;
const ContactElementImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 1000px !important;
    object-fit: contain;
    display: inline-block;
    vertical-align: middle
`;

const ContactElementContent = styled.div`
    display: inline-block;
    vertical-align: middle;
    padding: 0 0 0 15px;

    p{
        margin: 0;
        font-size: 16px;
        font-weight: bold;
        text-transform: uppercase;
        line-height: 1em;
    }

    span{
        margin-top: 3px;
        font-size: 12px;
        line-height: 1em;
        display: block;
    }

    span.badge{
        display: inline-block;
        border-radius: 1000px !important;
        padding: .35em 0.3em;
    }

`;


