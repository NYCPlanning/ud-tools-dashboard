import React from 'react';

export default function GenerateRWCDS({ws}) {
  const generate = () => {
    ws.submitMessage('getRWCDS');
  }
  return (
    <div className='flex'>
      <div className='bg-blue-500 p-2' onClick={(e) => generate(e)}>Generate RWCDS</div>
    </div>
  )
};
