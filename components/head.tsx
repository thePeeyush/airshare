import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { usePeer } from '@/store/peer'
import { PeerConnection } from '@/lib/peer'
import { useRouter } from 'next/navigation'
import Logo from './logo'

const Head = () => {
    const peerID = usePeer(state => state.peerID)
    const Router = useRouter()

    const handleDisconnect = async () => {
        await PeerConnection.closePeerSession()
        Router.push('/')
    }
    return (
        <div className='flex justify-between p-2 rounded-lg w-full items-center'>
            <Logo className='w-40 p-2 lg:max-w-xs bg-white rounded-md'/>
            <Popover>
                <PopoverTrigger >
                    <Avatar className='shadow-lg shadow-sky-300'>
                        <AvatarImage src="monkey.jpg" />
                        <AvatarFallback>Peer</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                    <div className='w-full flex flex-col items-center gap-2'>
                        <h1>{peerID}</h1>
                        <Button onClick={handleDisconnect} className='w-full bg-red-400'>Disconnect</Button>
                    </div>
                </PopoverContent>
            </Popover>


        </div>
    )
}

export default Head