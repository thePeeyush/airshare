'use client'

import React, { useEffect } from 'react'
import { QrReader } from 'react-qr-reader';
import { usePeer } from '@/store/peer';
import { PeerConnection } from '@/lib/peer';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useConnection } from '@/store/connection';

const Send = () => {
    const peerID = usePeer(s => s.peerID)
    const setPeerID = usePeer(s => s.setPeerID)
    const setIsConnected = useConnection(s=>s.setIsConnected)
    const router = useRouter()

    useEffect(()=>{
        connectToPeer()
    },[peerID])


    const connectToPeer = async ()=>{
        try {
            await PeerConnection.connectPeer(peerID)
            setIsConnected(true)
            toast({
              description:`Connected to ${peerID}`
            })
            router.push('/peer')
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <main className='flex flex-col justify-center items-center h-[70vh]'>
            {
                peerID === '' ? (
                    <>
                        <h1>Scan QR to send</h1>
                        <QrReader
                            constraints={{ facingMode: 'environment' }}
                            className='w-full'
                            scanDelay={300}
                            onResult={(result) => {
                                if (result) {
                                    setPeerID(result['text'])
                                }
                            }} />
                        <div className="w-52 h-52 border-4 border-blue-600 animate-pulse rounded-md absolute"></div>
                    </>
                )
                :(
                    <>
                    <Image
                    src={'/connecting.gif'}
                    width={300}
                    height={400}
                    alt='connecting'
                    />
                    <h1 className='text-center p-4 border-green-400 text-green-500 rounded-md'>🌐{ peerID}</h1>
                    </>
                )
            }
        </main>
    )
}

export default Send