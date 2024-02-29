import { create } from "zustand";



const usePeer = create<Peer>()((set) => ({
  peerID: "",
  myID: "",
  setPeerID: (ID) => set(() => ({ peerID: ID })),
  setMyID: (ID) => set(() => ({ myID: ID })),
  reset : ()=>(set({peerID:'',myID:''}))

}));

export { usePeer };
