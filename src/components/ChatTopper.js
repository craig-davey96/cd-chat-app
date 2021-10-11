import React from 'react'
import styled from "styled-components";
import { Badge } from 'react-bootstrap';

export default function ChatTopper({currentUID , Users}) {

    const onlineUsers = localStorage.getItem('onlineusers') ? JSON.parse(localStorage.getItem('onlineusers')) : [];

    return (
        <ChatTopperHolder>
            {Users.filter(user => user.uid === currentUID).map(filterdUser => {
                return (
                    <>
                        <ChatTopperHolderImage key={filterdUser.uid+'img'} src={'https://avatars.dicebear.com/api/bottts/'+filterdUser.uid+'.svg'}/>
                        <ChatTopperHolderContent key={filterdUser.uid}>
                            <ChatTopperTitle>{filterdUser.name}</ChatTopperTitle>
                            <ChatTopperActive>Current Status: {onlineUsers.includes(filterdUser.uid) ? <Badge className="bg-success">Online</Badge> :  <Badge className="bg-danger">Offline</Badge>}</ChatTopperActive>
                        </ChatTopperHolderContent>
                    </>
                )
            })}
            
        </ChatTopperHolder>
    )
}

const ChatTopperHolder = styled.div`
    width: 100%;
    height: 60px;
    background: #FFF;
    padding: 12px 16px;
    border-left: 1px solid #dee2e6;
`;

const ChatTopperHolderContent = styled.div`
    display: inline-block;
    vertical-align: middle;
`;

const ChatTopperHolderImage = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 1000px !important;
    object-fit: contain;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
`;

const ChatTopperTitle = styled.h2`
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 1em;
    margin: 0px 0 3px;
`;

const ChatTopperActive = styled.p`
    font-size: 12px;
    line-height: 1em;
    margin: 0px;

    span.badge{
        display: inline-block;
    }

`;