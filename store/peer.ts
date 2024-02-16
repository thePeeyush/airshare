import {create} from 'zustand'

interface Peer {
    peerID  : string,
    setPeerID : (ID:string) => void,
    myID  : string,
    setMyID : (ID:string) => void,
}

const usePeer = create<Peer>()((set)=>({
    peerID:'',
    setPeerID:(ID)=>(set(()=> ({peerID:ID}))),
    myID:'',
    setMyID:(ID)=>(set(()=> ({myID:ID}))),
}))

export {usePeer}