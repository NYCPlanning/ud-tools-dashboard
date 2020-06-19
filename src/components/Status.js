import React from 'react'

export default function Status({connected}) {
  const statusMsg = connected ? 'Connected to Rhino' : 'Disconnected'

  return (
    <div className='mb-4'>
      <span className={connected ? 'text-green-600' : 'text-red-600'}>◼︎</span> {statusMsg}
    </div>
  )
}
