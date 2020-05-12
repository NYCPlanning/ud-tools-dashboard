import React from 'react'

export default function Status({connected}) {
  const status = connected ? '⌁ Connected to Rhino' : '⍉ Disconnected'

  return (
    <div className={connected ? 'text-green-600 bg-green-300' : 'text-red-600 bg-red-300'}>
      {status}
    </div>
  )
}
