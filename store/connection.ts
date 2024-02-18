import { create } from "zustand";

interface Connection {
    isConnected : boolean,
    reciver:boolean,
    sender:boolean,

    setIsConnected : (bool:boolean) => void,
    setReciever : (bool:boolean) => void,
    setSender : (bool:boolean) => void,
}

const useConnection  = create<Connection>()((set)=>({
    isConnected:false,
    reciver:false,
    sender:false,
    setIsConnected:(bool)=>(set(({isConnected:bool}))),
    setReciever:(bool)=>(set(({reciver:bool}))),
    setSender:(bool)=>(set(({sender:bool}))),

}))

export {useConnection}