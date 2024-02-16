'use client'

import React from 'react'
import { QrReader } from 'react-qr-reader';
import { usePeer } from '@/store/peer';
import { PeerConnection } from '@/lib/peer';
import { useConnection } from '@/store/connection';
import Connected from '@/components/Connected';
import { Button } from '@/components/ui/button';

const page = () => {
    const peerID = usePeer(s => s.peerID)
    const setPeerID = usePeer(s => s.setPeerID)
    const isConnected = useConnection(s=>s.isConnected)
    const setIsConnected = useConnection(s=>s.setIsConnected)


    const connectToPeer = async ()=>{
        try {
            await PeerConnection.connectPeer(peerID)
            setIsConnected(true);
            PeerConnection.onIncomingConnection((conn)=>{
                const peerID = conn.peer
                PeerConnection.onConnectionDisconnected(peerID,()=>{
                    console.log('peer disconnected');
                })
            })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <main className='flex flex-col justify-center items-center h-[70vh]'>
            {
                peerID === '' && (
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
            }
            { (peerID !== '' && isConnected === false ) && <Button onClick={connectToPeer}>connect</Button> }
            { isConnected === true && <Connected/> }
        </main>
    )
}

export default page