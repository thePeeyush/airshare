'use client'

import React, { useEffect } from 'react'
import { QrReader } from 'react-qr-reader';
import { usePeer } from '@/store/peer';
import { PeerConnection } from '@/lib/peer';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useConnection } from '@/store/connection';
import Logo from './logo';
import { toast } from './ui/use-toast';


const Send = () => {
    const peerID = usePeer(s => s.peerID)
    const setPeerID = usePeer(s => s.setPeerID)
    const setIsConnected = useConnection(s => s.setIsConnected)
    const router = useRouter()

    useEffect(() => {
        connectToPeer()
    }, [peerID])

    const connectToPeer = async () => {
        try {
            await PeerConnection.connectPeer(peerID)
            setIsConnected(true)
        } catch (error) {
            console.log(error);
            router.push('/')
        }
    }

    const extractPeerID = (url: string) => {
        const params = new URLSearchParams(new URL(url).search);
        const peerID = params.get("peerID");
        if (peerID !== null) { setPeerID(peerID) }
        else {
            toast({
                description: "Please scan a valid QR from Airhsre"
            })
        }
    }

    return (
        <main className='flex flex-col justify-center items-center h-screen overflow-hidden w-full min-w-[350px] max-w-lg mx-auto'>
            <Logo className='fixed top-0 z-50 max-w-[250px]' />
            {
                peerID === '' ? (
                    <>
                        <QrReader
                            constraints={{ facingMode: 'environment' }}
                            className='w-full mask'
                            scanDelay={300}
                            onResult={(result) => {
                                if (result) {
                                    extractPeerID(result['text'])
                                }
                            }} />
                        <h1 className='text-gray-200'>Scan QR to connect</h1>
                    </>
                )
                    : (
                        <>
                            <div className="text-center">
                                <Image
                                    src={'/connecting.gif'}
                                    width={498}
                                    height={370}
                                    alt='loading'
                                    className='rounded-lg w-full max-w-xl h-auto'
                                />
                                <p className='text-white'>Connecting...</p>
                            </div>
                        </>
                    )
            }
        </main>
    )
}

export default Send