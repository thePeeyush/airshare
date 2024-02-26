'use client'

import React, { useEffect, useState } from 'react'
import { usePeer } from '@/store/peer'
import getBaseURL from '@/utils/getURL'
import { Button } from './ui/button'
import { PeerConnection } from '@/lib/peer'
import { useConnection } from '@/store/connection'
import { useRouter } from 'next/navigation'

const LinkShare = ({ onClick }: { onClick: React.MouseEventHandler }) => {
    const [clicked, setClicked] = useState(false)
    const [generated, setGenerated] = useState(false)
    const setPeerID = usePeer(s=>s.setPeerID)
    const setIsConnected =  useConnection(s=>s.setIsConnected)
    const router = useRouter()

    const myID = usePeer(s => s.myID)
    useEffect(() => {
        if (myID !== '') setGenerated(true)
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
    }, [myID])

    return (

        generated ? <GeneratedLink myID={myID} /> : (
            clicked ? <Button variant={'outline'} className='rounded-full'>Generating...</Button> : (
                <Button variant={'outline'} onClick={onClick} className='rounded-full'><h1 onClick={() => setClicked(true)} >Share Link</h1></Button>
            )
        )
    )
}

export default LinkShare

const GeneratedLink = ({ myID }: { myID: string }) => {

    const link = `${getBaseURL()}peer?peerID=${myID}`
    const [copied, setCopied] = useState(false)

    const handleCopyClick = async () => {
        await navigator.clipboard.writeText(link)
        setCopied(true)
    };


    return (
        <div className='flex flex-col justify-center items-center gap-2'>
            <p className='text-xs bg-gray-100 px-5 p-1 rounded-full'>{link}</p>
            {
                !copied ? <Button className='rounded-full' onClick={handleCopyClick}>Copy Link</Button> : <Button variant={'outline'} className='rounded-full'>Copied</Button>
            }
        </div>
    )
}