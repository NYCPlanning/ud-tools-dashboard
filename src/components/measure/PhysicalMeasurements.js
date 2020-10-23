import React from 'react';

export default function PhysicalMeasurements({ site }) {
  if ( !site ) return <div>Loading</div>;

  return (
    <div className='flex flex-col'>
      <span>Base Plane Elevation: {site.Dims.BasePlaneElevation}</span>
      <span>Ht Overall: {site.Dims.HeightFromBasePlane}</span>
      <span>Street Frontage: {site.Dims.Frontage}</span>
    </div>
  )
};
