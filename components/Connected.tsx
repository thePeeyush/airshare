import { usePeer } from '@/store/peer'
import React from 'react'
import FileInput from './FileInput'


const Connected = () => {

  const peerID = usePeer(s=>s.peerID)

  return (
    <div className="flex flex-col p-10 justify-around h-full">
        
        <div className=' border-green-500 border-2 rounded-md p-2 text-green-500'>Connected to {peerID} </div>
        <FileInput/>
    </div>
  )
}

export default Connected