import React from 'react';
import MapPanel from './MapPanel';
import ImportModelControls from './ImportModelControls';

export default function Context({ ws }) {
  return (
    <div>
      <MapPanel ws={ws} />
      {/* <ImportModelControls ws={ws} /> */}
    </div>
  )
};
