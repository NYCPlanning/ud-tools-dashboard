import React, { useState } from 'react';

export default function AddSite({ scenarios, ws }) {
  const [name, setName] = useState('');
  const [zones, setZones] = useState({});

  if (!scenarios || scenarios.length < 1) return null

  const addSiteHandler = (e) => {
    console.log(e);
    // send update thru ws
    setName('');
    setZones({});
    document.getElementById('add-site-id-field').focus();
  }

  const scenarioZones = scenarios.map((s, i) => (
    <label key={i} className='mr-2 mb-4'>
      <span className='mr-2'>Zone for Scenario {s.ID}:</span>
      <input type='text'
        className='w-20'
        value={zones[s.ID]}
        onChange={e => setZones({...zones, [s.ID]: e.target.value})} 
      />
    </label>
  ))

  return (
    <div className='flex mb-8 justify-between items-baseline'>
      <div className='flex flex-col items-start mb-8'>
        <label className='mr-2 mb-4'>
          <span className='mr-2'>ID:</span>
          <input id='add-site-id-field'
            type='text'
            className='w-20'
            value={name}
            onChange={e => setName(e.target.value)} 
          />
        </label>
        {scenarioZones}
      </div>
      <button onClick={addSiteHandler}>Add Site</button>
    </div>
  )
}