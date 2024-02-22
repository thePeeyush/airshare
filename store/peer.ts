import { create } from "zustand";

interface Peer {
  peerID: string;
  myID: string;
  setPeerID: (ID: string) => void;
  setMyID: (ID: string) => void;
  reset: () => void;
}

const usePeer = create<Peer>()((set) => ({
  peerID: "",
  myID: "",
  setPeerID: (ID) => set(() => ({ peerID: ID })),
  setMyID: (ID) => set(() => ({ myID: ID })),
  reset : ()=>(set({peerID:'',myID:''}))

}));

export { usePeer };
