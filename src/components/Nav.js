import React from 'react'
import Status from './Status'

export default function Nav({connected}) {
  return (
    <div>
      <h1>UDTools Dashboard</h1>
      <br/>
      <div className="flex flex-col items-start">
        Status:
        <Status connected={connected} />
      </div>
    </div>
  )
}
