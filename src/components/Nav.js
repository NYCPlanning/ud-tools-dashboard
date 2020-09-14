import React from 'react'
import Status from './Status'

export default function Nav({connected, mode, tryReconnect}) {
  const todaysDate = () => {
    const now = new Date();
    const date = now.toDateString();
    return date;
  }

  return (
    <div className='flex flex-col mb-4'>
      <div className="flex justify-between">
        <a target="_blank" 
          href={process.env.REACT_APP_DOCS_URL}>
          Guide ↗
        </a>
        <Status connected={connected} tryReconnect={tryReconnect}/>
      </div>
      <div className="flex justify-between">
        <span>←</span>
        <span>Map</span>
        <span>Site Selector</span>
        <span>Generate Massings</span>
        <span>Details</span>
        <span>→</span>
      </div>
    </div>
  )
}
