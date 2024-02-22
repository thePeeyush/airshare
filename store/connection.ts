import { create } from "zustand";

interface Connection {
    isConnected : boolean,
    reciver:boolean,
    sender:boolean,
    startSession:boolean,

    setIsConnected : (bool:boolean) => void,
    setReciever : (bool:boolean) => void,
    setSender : (bool:boolean) => void,
    setStartSession : (bool:boolean)=>void,
    reset: () => void;

}

const useConnection  = create<Connection>()((set)=>({
    isConnected:false,
    reciver:false,
    sender:false,
    startSession:false,
    setIsConnected:(bool)=>(set(({isConnected:bool}))),
    setReciever:(bool)=>(set(({reciver:bool}))),
    setSender:(bool)=>(set(({sender:bool}))),
    setStartSession:(bool)=>(set({startSession:bool})),
    reset:()=>(set({isConnected:false,reciver:false,sender:false}))

}))

export {useConnection}