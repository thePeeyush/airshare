import React from 'react'

const Btn = ({
    children,
    label
  }: Readonly<{
    children: React.ReactNode,
    label:string
  }>) => {
  return (
    <div className='flex flex-col justify-center items-center m-4 w-24 h-24 rounded-full group'>
        {children}
        <p className=' text-xs text-slate-800'>{label}</p>
    </div>
  )
}

export default Btn