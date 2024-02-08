'use client'

import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader';

const page = () => {
    const [data, setData] = useState<string>("Scanning");
    return (
        <main className='flex flex-col justify-center items-center h-[70vh]'>
            <h1>Scan QR to send</h1>
            <QrReader
             constraints={{facingMode:'environment'}}
             className='w-full'
             scanDelay={300}
             onResult={(result)=>{
                if(result){
                    setData(result['text'])
                }
             }}
             />

            <div className='text-xs break-words text-clip'>{data}</div>

        </main>
    )
}

export default page