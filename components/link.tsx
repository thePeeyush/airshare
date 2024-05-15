'use client'

import React, { useEffect, useState } from 'react'
import { usePeer } from '@/store/peer'
import getBaseURL from '@/lib/getURL'
import { Button } from './ui/button'
import { PeerConnection } from '@/lib/peer'
import { useConnection } from '@/store/connection'
import { useRouter } from 'next/navigation'

const LinkShare = () => {
    const [clicked, setClicked] = useState(false)
    const [generated, setGenerated] = useState(false)
    const [copied, setCopied] = useState(false)
    const setPeerID = usePeer(s => s.setPeerID)
    const setIsConnected = useConnection(s => s.setIsConnected)
    const router = useRouter()

    const myID = usePeer(s => s.myID)
    useEffect(() => {
        if (myID !== '') setGenerated(true)
        PeerConnection.onIncomingConnection((conn) => {
            const id = conn.peer
            setPeerID(id)
            setIsConnected(true)
            router.push('/peer')
        })
    }, [myID])

    useEffect(() => {
        if (!copied) {
            copyLink()
        }
    }, [generated, clicked])

    const copyLink = async () => {
        if (generated && clicked) {
            const link = `${getBaseURL()}peer?peerID=${myID}`
            await navigator.clipboard.writeText(link)
            setCopied(true)
        }
    }

    return (
        <Button onClick={() => setClicked(true)} variant='outline' className='rounded-full w-48 bg-transparent backdrop-blur-sm text-white'>{
            copied ? <>Copied</>
                : (clicked && !generated ? <>Generating...</>
                    : <>Share Link</>)
        }</Button>
    )
}

export default LinkShare