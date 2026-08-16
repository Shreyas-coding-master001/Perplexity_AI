import React, { useEffect } from 'react'
import { SockectConnection } from '../service/chat.socket';
import authHook from "../../auth/hooks/auth.hook.js";

const DashBorad = () => {
    const chat = useChat();
    
    useEffect(() => {
        chat.SockectConnection();
    }, [])


  return (
    <div className='min-w-screen h-screen bg-zinc-900 text-white'>
        <h1>Welcome to DashBorad</h1>
        
    </div>
  )
}

export default DashBorad;
