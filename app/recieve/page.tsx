'use client'

import React, { useEffect } from 'react'
import QRCode from 'react-qr-code'
import { DataType, PeerConnection } from '@/lib/peer'
import {usePeer} from '@/store/peer'
import { useConnection } from '@/store/connection'
import { useToast } from '@/components/ui/use-toast'
import download from "js-file-download";


const Recieve = () => {  

  const myID =  usePeer(s=>s.myID)
  const setIsConnected = useConnection(s=>s.setIsConnected)
  const {toast} = useToast()

  try {
    setIsConnected(true);
    PeerConnection.onIncomingConnection((conn)=>{
        const peerID = conn.peer
        PeerConnection.onConnectionDisconnected(peerID,()=>{
            toast({
                description:'Peer Disconnected'
            })
        })
        PeerConnection.onConnectionReceiveData(peerID,(file)=>{
            toast({
                title:'Data .... ',
                description:`${file.fileName}`
            })
            if (file.dataType === DataType.FILE) {
              download(file.file || '', file.fileName || "fileName", file.fileType)
          }
            
        })
    })
} catch (error) {
    console.log(error);
}
  return (
    <div className='flex  flex-col justify-center items-center h-screen '>
      <h1 className='m-10'>Share QR to recieve files</h1>
        <QRCode className='p-4 bg-white' value={myID}/>
    </div>
  )
}

export default Recieve