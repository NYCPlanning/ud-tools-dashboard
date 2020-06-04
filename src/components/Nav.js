import React from 'react'
import Status from './Status'

export default function Nav({connected, version, buildDate}) {
  return (
    <div className="col-span-1">
      <h1 className="w-limit">UDTools Dashboard</h1>
      <p>{version}</p>
      <p>{buildDate}</p>
      <div className="flex flex-col items-start">
        Status:
        <Status connected={connected} />
      </div>
      <style>{`
        .w-limit {
          max-width: 12rem;
        }
      `}</style>
    </div>
  )
}
