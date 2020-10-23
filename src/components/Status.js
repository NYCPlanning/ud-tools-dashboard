import React from 'react'

export default function Status({connected, tryReconnect}) {
  let statusMessage;
  if (connected) statusMessage = <span>Connected to Rhino ●</span>
  else statusMessage = <span className='cursor-pointer' onClick={tryReconnect}>Disconnected ↺</span>

  return (
    <div className={connected ? 'mb-6 text-green-400 green-glow' : 'mb-4 text-red-600'}>
      {statusMessage}
    </div>
  )
}
