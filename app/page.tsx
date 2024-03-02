'use client'

import Btn from "@/components/btn";
import LinkShare from "@/components/link";
import Logo from "@/components/logo";
import { PeerConnection } from "@/lib/peer";
import { useConnection } from "@/store/connection";
import { usePeer } from "@/store/peer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BsDownload, BsUpload } from "react-icons/bs";

export default function Home() {

  const setMyID = usePeer(s => s.setMyID)
  const setReciever = useConnection(s => s.setReciever)
  const setSender = useConnection(s => s.setSender)
  const setStartSession = useConnection(s => s.setStartSession)
  const Router = useRouter()

  useEffect(() => {
    setSender(false)
    setReciever(false)
    Disconnect()
    startSession()
    setStartSession(true)
  }, [])

  const startSession = async () => {
    const id = await PeerConnection.startPeerSession()
    setMyID(id)
  }

  const Disconnect = async () => {
    await PeerConnection.closePeerSession()
    Router.push('/')
  }

  return (
    <main className=" flex flex-col justify-around  items-center px-8 pb-8 min-h-screen">
      <Logo/>
      <p className="text-xs text-gray-400">🔒 end to end encrypted</p>
      <div className="flex flex-col items-center">
        <Image
          src={'/share.svg'}
          width={500}
          height={455}
          alt="img"
          className="max-w-[280px] md:max-w-xs"
        />
        <p className="text-center text-slate-500">Share any file on any device securely and seamlessly</p>
      </div>
      <div className="mt-6 flex">
        <Link onClick={() => setSender(true)} href={'/peer'}><Btn label="send"><BsUpload className=" text-5xl animate-bounce text-orange-600 group-hover:text-7xl" /></Btn></Link>
        <Link onClick={() => setReciever(true)} href={'/peer'}><Btn label="recieve"><BsDownload className="text-5xl group-hover:text-7xl  animate-bounce text-green-600" /></Btn></Link>
      </div>
      <div>
        <LinkShare />
      </div>
    </main>
  );
}
