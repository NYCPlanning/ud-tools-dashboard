import React from 'react';
import { formatDim } from '../../utils/format';

export default function Dimensions({ site }) {
  if ( !site ) return null;
  const dims = site.Dims;

  return (
    <div className='flex flex-col mb-2'>
      <span className='font-bold'>Dimensions</span>
      <span>Base Plane Elevation: {formatDim(dims.BasePlaneElevation)}'</span>
      <span>Ht Overall: {formatDim(dims.HeightFromBasePlane)}'</span>
      <span>Street Frontage: {formatDim(dims.Frontage)}'</span>
    </div>
  )
};
