'use client'

import React, { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import { PeerConnection } from '@/utils/peer'

const page = ({}) => {
  const [id,setID] = useState('') 

  useEffect(()=>{
    PeerConnection.startPeerSession()
    .then((value)=>{
        setID(value)
    })
  },[])
  return (
    <div className='flex  flex-col justify-center items-center h-screen '>
      <h1 className='m-10'>Share QR to recieve files</h1>
        <QRCode className='p-4 bg-white' value={id}/>
    </div>
  )
}

export default page