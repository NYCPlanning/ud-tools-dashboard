import React, { useState } from 'react';

export default function AddScenario({ ws }) {
  const [name, setName] = useState('');

  const handleAddScenario = (e) => {
    setName('');
    ws.submitMessage('addScenario', name);
    document.getElementById('add-scenario-id-field').focus();
  }

  return (
    <div className='flex mb-8 justify-between items-baseline'>
      <label className='mr-2 mb-4'>
        <span className='mr-2'>ID:</span>
        <input id='add-scenario-id-field'
          type='text'
          className='w-20'
          value={name}
          onChange={e => setName(e.target.value)} 
        />
      </label>
      <button onClick={handleAddScenario}>Add Scenario</button>
    </div>
  )
}