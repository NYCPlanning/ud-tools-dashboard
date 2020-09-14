import React from 'react'
import Status from './Status'

export default function Nav({connected, mode, tryReconnect}) {
  const todaysDate = () => {
    const now = new Date();
    const date = now.toDateString();
    return date;
  }

  return (
    <div className='flex flex-col'>
      <div className="flex justify-between">
        <a target="_blank" href={`https://nycplanning.github.io/ud-digital-practice/plugin/quickstart`}>Guide ↗</a>
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
