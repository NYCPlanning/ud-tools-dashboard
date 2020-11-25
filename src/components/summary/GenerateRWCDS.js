import React from 'react';

export default function GenerateRWCDS({ws}) {
  const generate = () => {
    ws.submitMessage('getRWCDS');
  }
  return (
    <div className='flex mb-2'>
      <button onClick={(e) => generate(e)}>Generate RWCDS</button>
    </div>
  )
};
