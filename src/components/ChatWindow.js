import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {Form, FormControl, InputGroup , Button} from 'react-bootstrap'
import {FiSend} from 'react-icons/fi'

import moment from 'moment';

import axios from 'axios'

import socket from '../components/Socket';
import {useParams} from 'react-router-dom';

export default function ChatWindow({fullHeight , currentUID}) {

    const params = useParams();
    const [loading, setLoading] = useState(false);

    let componentMounted = true;

    const [messagedata , setMessageData] = useState({members : [localStorage.getItem('user') , params.uid] , 'sender' : localStorage.getItem('user') , 'message' : ''});
    const [messages , setMessages] = useState([]);

    const sendMessage = (e) => {
        e.preventDefault();
        let message = messagedata;
        socket.emit('send_message' , message);
        setMessageData({...messagedata , ['message']: ''});
    };

    useEffect(() => {

        socket.on('send_message' , (msgs) => {
            if (componentMounted){
                setMessages(msgs);
            }
        });

        return () => { // This code runs when component is unmounted
            componentMounted = false; // (4) set it to false if we leave the page
        }
        
    } , [])

    useEffect(() => {
        var newMembers = [localStorage.getItem('user') , params.uid]
        if(params.uid != undefined){
            setMessageData({...messagedata , ['members']: newMembers});
        }
        axios.post('https://chat-app-new-cd.herokuapp.com/api/messages/room' , {room : newMembers}).then(res => { setMessages(res.data); })
    } , [params.uid])


    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

    return (
        <div>
            <ChatWindowHolder className={fullHeight === true ? 'full-height' : ''}>
                {fullHeight === true ? (<h1>CHOOSE A USER<br/>TO CHAT TO</h1>) : (
                    messages.map((msg , index) => (
                        <ChatItem key={index} className={localStorage.getItem('user') === msg._id.sender ? 'send' : 'recieved'}>
                            {
                                msg.obj.map(m => (
                                    <span>{m.message}</span>
                                ))
                            }
                        </ChatItem>
                    ))
                )}
                <AlwaysScrollToBottom />
            </ChatWindowHolder>
            {fullHeight === false ? (
                <ChatFormHolder>
                    <Form onSubmit={sendMessage}>
                        <InputGroup>
                            <FormControl type="textarea" value={messagedata.message} onChange={e => setMessageData({...messagedata , ['message']: e.target.value})}/>
                            <InputGroup.Append>
                                <Button type="submit"><FiSend/></Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </ChatFormHolder>
            ) : (<></>)}
        </div>
    )
}

const ChatWindowHolder = styled.div`
    width: 100%;
    height: calc(100vh - 188px);
    background: #FFF;
    border-left: 1px solid #dee2e6;
    border-top: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
    background: url('/chat-bkg.svg');
    background-size: 200px 200px;
    padding: 20px;
    overflow-y: auto;

    &.full-height{
        height: calc(100vh - 56px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center
    }

`;

const ChatItem = styled.div`

    &.recieved{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        margin-bottom: 20px;
        
        span{
            padding: 12px;
            background: #212529;
            border-top-left-radius: 0px !important;
            border-top-right-radius: 20px !important;
            border-bottom-left-radius: 0px !important;
            border-bottom-right-radius: 20px !important;
            line-height: 10px;
            color: #FFF;
            display: inline-block;
            clear: both;
            margin-bottom: 5px;

            &:last-of-type{
                border-top-right-radius: 20px !important;
                border-top-left-radius: 0px !important;
                border-bottom-left-radius: 20px !important;
                border-bottom-right-radius: 20px !important;
            }

            &:first-of-type{
                border-top-right-radius: 20px !important;
                border-top-left-radius: 20px !important;
                border-bottom-right-radius: 20px !important;
                border-bottom-left-radius: 0px !important;
            }

        }
    }

    &.send{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        text-align: right;
        margin-bottom: 20px;

        span{
            padding: 12px;
            background: #4B0082;
            border-top-left-radius: 20px !important;
            border-top-right-radius: 0px !important;
            border-bottom-left-radius: 20px !important;
            border-bottom-right-radius: 0px !important;
            line-height: 10px;
            color: #FFF;
            display: inline-block;
            clear: both;
            margin-bottom: 5px;

            &:last-of-type{
                border-top-left-radius: 20px !important;
                border-top-right-radius: 0px !important;
                border-bottom-left-radius: 20px !important;
                border-bottom-right-radius: 20px !important;
            }

            &:first-of-type{
                border-top-right-radius: 20px !important;
                border-top-left-radius: 20px !important;
                border-bottom-left-radius: 20px !important;
                border-bottom-right-radius: 0px !important;
            }

        }
    }

`;

const ChatFormHolder = styled.div`
    width: 100%;
    height: 70px;
    background: #FFF;
    border-left: 1px solid #dee2e6;
    padding: 16px;
`;