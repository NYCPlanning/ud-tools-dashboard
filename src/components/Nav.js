import React from 'react';
import { Router, Link } from 'react-router-dom';
import Status from './Status';

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
          {/* <span>←</span> */}
          <Link to="/context">Context</Link>
          <Link to="/setup">Setup</Link>
          <Link to="/build">Build</Link>
          <Link to="/map">Measure</Link>
          <Link to="/map">Export</Link>
          {/* <Link to="/map">Map</Link> */}
          {/* <span>Site Selector</span>
          <span>Generate Massings</span>
          <span>Details</span>
          <span>→</span> */}
        </div>
      </div>
  )
}
