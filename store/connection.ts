import { create } from "zustand";

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