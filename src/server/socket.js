
import Cookies from 'js-cookie';
import { Manager, io } from 'socket.io-client';

const auth = Cookies.get('auth.timyer.ir');
const work = Cookies.get('workspace.timyer.ir');


const manager = new Manager('https://teamyer-backend.liara.run',{ //   http://localhost:4000
    autoConnect:true,
    reconnection:true,
    reconnectionAttempts:30,
    reconnectionDelay:1000,
    transports:["websocket"]
});

export const socket = manager.socket("/",{
  auth:{
    "authorization": `Bearer ${auth}`,
    "worspacerole": work
  },
}
);



