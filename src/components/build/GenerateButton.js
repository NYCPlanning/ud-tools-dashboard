import React from 'react';

export default function GenerateButton({ws, label}) {
  const generate = () => {
    ws.submitMessage(`generate${label}`);
  }
  
  return (
    <div className='flex mb-2'>
      <button onClick={(e) => generate(e)}>Generate {label}</button>
    </div>
  )
};
