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
          <NavLink to='/context' className='button px-2' activeClassName='button-active'>Context</NavLink>
          <NavLink to='/setup' className='button px-2' activeClassName='button-active'>Setup</NavLink>
          <NavLink to='/build' className='button px-2' activeClassName='button-active'>Build</NavLink>
          <NavLink to='/measure' className='button px-2' activeClassName='button-active'>Measure</NavLink>
          <NavLink to='/summarize' className='button px-2' activeClassName='button-active'>Summary</NavLink>
        </div>
      </div>
  )
}
