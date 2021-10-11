import io from 'socket.io-client';
const user = localStorage.getItem('user') ? localStorage.getItem('user') : 'null';
const socket = io('https://chat-app-new-cd.herokuapp.com/' , {query: 'user='+user});
socket.connect({reconnect: true, forceNew: true});
export default socket;