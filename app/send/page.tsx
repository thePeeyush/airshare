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

             <div className="w-52 h-52 border-4 border-blue-600 animate-pulse rounded-md absolute"></div>

            <div className='text-xs break-words text-clip'>{data}</div>

        </main>
    )
}

export default page