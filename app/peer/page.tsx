'use client'

import { Data, DataType, PeerConnection, Pre } from '@/lib/peer'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect } from 'react'
import download from "js-file-download";
import FileInput from '@/components/FileInput'
import { usePeer } from '@/store/peer'
import { useConnection } from '@/store/connection'
import Recieve from '@/components/recieve'
import Send from '@/components/send'
import Head from '@/components/head'
import SharedList from '@/components/sharedFiles'
import {useShared} from '@/store/files'
import NotShared from '@/components/notShared'
import Image from 'next/image';

const page = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const peerID = usePeer(s => s.peerID)
    const setPeerID = usePeer(s => s.setPeerID)
    const setMyID = usePeer(s => s.setMyID)
    const isConnected = useConnection(s => s.isConnected)
    const setIsConnected = useConnection(s => s.setIsConnected)
    const reciever = useConnection(s => s.reciver)
    const sender = useConnection(s => s.sender)
    const resetConnection = useConnection(s => s.reset)
    const resetPeer = usePeer(s => s.reset)
    const resetShared = useShared(s => s.reset)
    const fileCount = useShared(s => s.count)
    const setCount = useShared(s => s.setCount)
    const setfiles = useShared(s => s.setList)
    const setStatus = useShared(s => s.setStatus)
    const startSession = useConnection(s => s.startSession)
    const setStartSession = useConnection(s => s.setStartSession)

    useEffect(() => {
        if (searchParams.has('peerID')) {
            const peerID = searchParams.get('peerID')
            setStartSession(true)
            connectToPeer(peerID!)
        }
        if (!startSession && !searchParams.has('peerID')) router.push('/')

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [])

    useEffect(() => {
        if (isConnected) handleConnection()
    }, [isConnected])

    const handleBeforeUnload = () => {
        PeerConnection.closePeerSession()
    }

    const connectToPeer = async (peerID: string) => {
        try {
            const id = await PeerConnection.startPeerSession()
            setMyID(id)
            setPeerID(peerID)
            await PeerConnection.startPeerSession()
            await PeerConnection.connectPeer(peerID)
            setIsConnected(true)
        } catch (error) {
            console.log(error);
            router.push('/')
        }
    }

    const handleConnection = () => {
        PeerConnection.onConnectionDisconnected(peerID, () => {
            PeerConnection.closePeerSession()
            router.push('/')
            resetConnection()
            resetPeer()
            resetShared()
        })

        PeerConnection.onConnectionReceiveData<Data>(peerID, (file) => {
            if (file.dataType === DataType.FILE) {
                download(file.file || '', file.fileName || "fileName", file.fileType)
                setStatus(file.id, true)
            }
        })

        PeerConnection.onConnectionReceiveData<Pre>(peerID, (info) => {
            if (info.filename) {
                setfiles({ id: info.id, name: info.filename, size: info.filesize, status: false })
                setCount()
            }
        })
    }

    if (isConnected) {
        return (
            <main className='flex flex-col justify-between items-center p-4 peer-bg'>
                <Head />
                {fileCount !== 0 ? <SharedList className='bg-transparent border-none' /> : <NotShared />}
                <FileInput />
            </main>
        )
    }

    if (reciever) {
        return (<Recieve />)
    }

    if (sender) {
        return (<Send />)
    }

    if (searchParams.has('peerID')) {
        return (
            <div className="flex flex-col gap-2 justify-center items-center p-12 w-screen h-screen ">
                <Image
                    src={'/connecting.gif'}
                    width={498}
                    height={370}
                    alt='loading'
                    className='rounded-lg w-full max-w-xl h-auto'
                />
                <p>Connecting...</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2 justify-center items-center p-12 w-screen h-screen ">
            <Image
                src={'/disconnected.svg'}
                width={500}
                height={400}
                alt='loading'
                className='rounded-lg w-full max-w-xl h-auto'
            />
            <p>Disconnected</p>
        </div>
    )


}

export default page

