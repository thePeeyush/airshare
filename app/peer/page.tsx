'use client'

import { Data, DataType, PeerConnection, Pre } from '@/lib/peer'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import download from "js-file-download";
import FileInput from '@/components/FileInput'
import { usePeer } from '@/store/peer'
import { useConnection } from '@/store/connection'
import Recieve from '@/components/recieve'
import Send from '@/components/send'
import Head from '@/components/head'
import SharedList from '@/components/sharedList'
import useShared from '@/store/shared'
import NotShared from '@/components/notShared'
import Image from 'next/image';

const page = () => {

    const router = useRouter()
    const peerID = usePeer(s => s.peerID)
    const isConnected = useConnection(s => s.isConnected)
    const reciever = useConnection(s => s.reciver)
    const sender = useConnection(s => s.sender)
    const fileCount = useShared(s => s.count)
    const setCount = useShared(s => s.setCount)
    const setfiles = useShared(s => s.setList)
    const setStatus = useShared(s => s.setStatus)


    useEffect(() => {
        if (isConnected) {
            handleConnection()
        }
    }, [isConnected])

    const handleConnection = () => {
        PeerConnection.onConnectionDisconnected(peerID, () => {
            PeerConnection.closePeerSession()
            router.push('/')
        })

        PeerConnection.onConnectionReceiveData<Data>(peerID, (file) => {
            if (file.dataType === DataType.FILE) {
                download(file.file || '', file.fileName || "fileName", file.fileType)
                setStatus(file.id,true)
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

    return(
        <div className="flex flex-col gap-2 justify-center items-center p-12 w-screen h-screen ">
            <Image
            src={'/loading.gif'}
            width={500}
            height={500}
            alt='loading'
            className='rounded-lg w-full max-w-xl'
            />
            <p>Connecting...</p>
        </div>
    )
}

export default page

