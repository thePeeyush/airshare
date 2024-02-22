'use client'

import React from 'react'
import QRCode from 'react-qr-code'
import { PeerConnection } from '@/lib/peer'
import { usePeer } from '@/store/peer'
import { useRouter } from 'next/navigation'
import { useConnection } from '@/store/connection'
import Image from 'next/image'

const Recieve = () => {

  const myID = usePeer(s => s.myID)
  const setPeerID = usePeer(s => s.setPeerID)
  const setIsConnected = useConnection(s => s.setIsConnected)
  const router = useRouter()

  try {
    PeerConnection.onIncomingConnection((conn) => {
      const id = conn.peer
      setPeerID(id)
      setIsConnected(true)
      router.push('/peer')
    })
  } catch (error) {
    console.log(error);

  }

  return (
    <div className='flex  flex-col justify-center items-center h-screen '>
      <Image
        src={'/logo.png'}
        width={500}
        height={500}
        alt="logo"
        className=" z-50 absolute top-5 rounded-xl max-w-[250px]"
      />
      <h1 className='m-10'>Scan this QR to send files</h1>
      {myID !== '' ? <QRCode className='p-4 bg-white shadow-blue-400 shadow-2xl rounded-xl' value={myID} /> : <h1 className=' animate-pulse'>Generating ... </h1>}
    </div>
  )
}

export default Recieve

