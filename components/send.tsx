'use client'

import React, { useEffect } from 'react'
import { QrReader } from 'react-qr-reader';
import { usePeer } from '@/store/peer';
import { PeerConnection } from '@/lib/peer';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useConnection } from '@/store/connection';
import Logo from './logo';


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


    return (
        <main className='flex flex-col justify-center items-center h-screen overflow-hidden max-w-lg mx-auto'>
            <Logo className='fixed top-0 z-50 max-w-[250px]'/>
            {
                peerID === '' ? (
                    <>
                        <QrReader
                            constraints={{ facingMode: 'environment' }}
                            className='w-full mask'
                            scanDelay={300}
                            onResult={(result) => {
                                if (result) {
                                    setPeerID(result['text'])
                                }
                            }} />
                        <h1>Scan QR to send</h1>
                    </>
                )
                    : (
                        <>
                            <Image
                                src={'/connecting.gif'}
                                width={900}
                                height={1200}
                                alt='connecting'
                                className=' rounded-lg'
                            />
                            <h1 className='text-center p-4 border-green-400 text-green-500 rounded-md w-full max-w-4xl'>🌐{peerID}</h1>
                        </>
                    )
            }
        </main>
    )
}

export default Send