import React from 'react'

export default function Status({connected, tryReconnect}) {
  let statusMessage;
  if (connected) statusMessage = <span>Connected to Rhino ●</span>
  else statusMessage = <button onClick={tryReconnect}>Disconnected ↺</button>

  return (
    <div className={connected ? 'mb-4 text-green-600' : 'mb-4 text-red-600'}>
      {statusMessage}
    </div>
  )
}
