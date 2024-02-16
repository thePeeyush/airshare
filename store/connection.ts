import { create } from "zustand";

interface Connection {
    isConnected : boolean,
    setIsConnected : (bool:boolean) => void,
    
}

const useConnection  = create<Connection>()((set)=>({
    isConnected:false,
    setIsConnected:(bool)=>(set(({isConnected:bool}))),
}))

export {useConnection}