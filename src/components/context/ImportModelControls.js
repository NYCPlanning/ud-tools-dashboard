import React, { useState } from 'react';

export default function ImportModelControls({ ws }) {
  const [ mode, setMode ] = useState('MapOnly');

  const runGetModel = () => {
    ws.submitMessage('runGetModel', mode)
  }

  const handleModeChange = (e) => {
    setMode(e.target.value);
  }

  return (
    <div className='command mb-4'>
      <div className='flex mb-4' onChange={handleModeChange.bind(this)}>
        <span className='mr-2'>
          <input className='mr-1' type='radio' value='MapOnly' name='mode' defaultChecked={mode==='MapOnly'}/>
          Map Only
        </span>
        <span className='mr-2'>
          <input className='mr-1' type='radio' value='NoTopo' name='mode' defaultChecked={mode==='NoTopo'}/>
          Flattened
        </span>
        <span className='mr-2'>
          <input className='mr-1' type='radio' value='Full3D' name='mode' defaultChecked={mode==='Full3D'}/> 
          Full 3D
        </span>
      </div>
      <button onClick={runGetModel}>Import Model</button>
    </div>
  )
}