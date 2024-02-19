'use client'

import Btn from "@/components/btn";
import { PeerConnection } from "@/lib/peer";
import { useConnection } from "@/store/connection";
import { usePeer } from "@/store/peer";
import Image from "next/image";
import Link from "next/link";
import { BsDownload,BsUpload } from "react-icons/bs";

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
    <main className=" flex flex-col justify-around  items-center h-screen px-8 relative">
      <Image
      src={'/logo.png'}
      width={500}
      height={500}
      alt="logo"
      className=""
      />
      <div className="flex flex-col items-center">
      <Image
      src={'/2945466.jpg'}
      width={500}
      height={500}
      alt="img"
      className="max-w-[280px] md:max-w-xs"
      />
      <p className="text-center text-slate-500">Share any file on any device securely and seamlessly</p>
      </div>
      <div className="mt-6 flex">
        <Link onClick={()=>startSession('sender')} href={'/peer'}><Btn label="send"><BsUpload className=" text-5xl animate-bounce text-orange-600 group-hover:text-7xl"/></Btn></Link>
        <Link onClick={()=>startSession('reciever')} href={'/peer'}><Btn label="recieve"><BsDownload className="text-5xl group-hover:text-7xl  animate-bounce text-green-600"/></Btn></Link>
      </div>
      <p className="text-xs text-gray-400">🔒 end to end encrypted</p>
    </main>
  );
}
