import { useCallback, useEffect, useState } from 'react';

export default function UseSocket(socket,socketEvent,onEventData){
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [eventData, setEventData] = useState([]);

    const onConnect=useCallback(()=>{
      // console.log(socket.connected); // true
      if (socket.recovered) {
          console.log(`recovered : ${socket.recovered}`)
        } else {
          // new or unrecoverable session
        }
      setIsConnected(true);
    })
    const onDisconnect=useCallback(()=>{
      setIsConnected(false);

    })
    const onReconnecting=useCallback((attemptNumber)=>{
      setIsConnected(true);
      // console.log(`Attempting to reconnect to server. Attempt ${attemptNumber}`);
      // console.log(`socket.recovered: ${socket.recovered}`);
    })
    const onReconnectError=useCallback((error)=>{
      // console.error('Failed to reconnect to server', error);
      // console.log(`socket.recovered: ${socket.recovered}`);
    })
    // const onEventData=useCallback((value)=>{
    //   setEventData(previous => [...previous, value]);
    // })

   useEffect(()=>{
    if(socketEvent){
      socket.on(socketEvent, onEventData);
    }
  

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on("reconnecting", onReconnecting);
    socket.on('reconnect_error', onReconnectError);
  
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('reconnecting', onReconnecting);
      socket.off('reconnect_error', onReconnectError);
      socket.off(socketEvent, onEventData);
    };
   },[])
   return { isConnected, eventData };
  }