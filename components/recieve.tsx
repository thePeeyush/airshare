'use client'

import React from 'react'
import QRCode from 'react-qr-code'
import { PeerConnection } from '@/lib/peer'
import {usePeer} from '@/store/peer'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useConnection } from '@/store/connection'

const Recieve = () => {  

  const myID =  usePeer(s=>s.myID)
  const setPeerID = usePeer(s=>s.setPeerID)
  const setIsConnected =  useConnection(s=>s.setIsConnected)
  const {toast} = useToast()
  const router = useRouter()

  try {
    PeerConnection.onIncomingConnection((conn)=>{
      const id = conn.peer
      setPeerID(id)
      setIsConnected(true)
      toast({
        description:`Connected to ${id}`
      })
      router.push('/peer')
    })
  } catch (error) {
    console.log(error);
    
  }

  return (
    <div className='flex  flex-col justify-center items-center h-screen '>
      <h1 className='m-10'>Share QR to recieve files</h1>
        {myID !== '' ? <QRCode className='p-4 bg-white' value={myID}/> : <h1 className=' animate-pulse'>Generating ... </h1> }
    </div>
  )
}

export default Recieve

