'use client'

import React from 'react'
import QRCode from 'react-qr-code'

const page = ({}) => {
  const value = Math.random.toString()
  return (
    <div className='flex  flex-col justify-center items-center h-screen '>
      <h1 className='m-10'>Share QR to recieve files</h1>
        <QRCode className='p-4 bg-white' value={value}/>
    </div>
  )
}

export default page