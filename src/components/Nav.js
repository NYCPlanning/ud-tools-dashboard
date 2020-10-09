import React from 'react';
import { NavLink } from 'react-router-dom';
import Status from './Status';

export default function Nav({connected, tryReconnect}) {
  return (
      <div className='flex flex-col mb-4'>
        <div className='flex justify-between'>
          <a 
            target='_blank'
            rel='noopener noreferrer' 
            href={process.env.REACT_APP_DOCS_URL}
          >
            Guide ↗
          </a>
          <Status connected={connected} tryReconnect={tryReconnect}/>
        </div>
        <div className='flex justify-between'>
          <NavLink to='/context' activeClassName='nav-active'>Context</NavLink>
          <NavLink to='/setup' activeClassName='nav-active'>Setup</NavLink>
          <NavLink to='/build' activeClassName='nav-active'>Build</NavLink>
          <NavLink to='/measure' activeClassName='nav-active'>Measure</NavLink>
          <NavLink to='/summarize' activeClassName='nav-active'>Summary</NavLink>
        </div>
      </div>
  )
}
