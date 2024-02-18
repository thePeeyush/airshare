'use client'

import { PeerConnection } from "@/lib/peer";
import { useConnection } from "@/store/connection";
import { usePeer } from "@/store/peer";
import Link from "next/link";

export default function Home() {
  
  const setMyID = usePeer(s=>s.setMyID)
  const setReciever = useConnection(s=>s.setReciever)
  const setSender = useConnection(s=>s.setSender)

  setSender(false)
  setReciever(false)


  const startSession = async (key:string)=>{
    const id = await PeerConnection.startPeerSession()
    setMyID(id)
    key === 'sender' && setSender(true)
    key === 'reciever' && setReciever(true)
  }

  return (
    <main className=" flex flex-col justify-center items-center h-screen p-8">
      <h1>Share any file over the ShareU securely and seamlessly</h1>
      <div className="mt-64">
        <Link onClick={()=>startSession('sender')} href={'/peer'}><button className="w-28 h-28 text-center bg-orange-600 m-4 rounded-full ">Send</button></Link>
        <Link onClick={()=>startSession('reciever')} href={'/peer'}><button className="w-28 h-28 text-center bg-green-600  m-4  rounded-full">Recieve</button></Link>
      </div>
    </main>
  );
}
