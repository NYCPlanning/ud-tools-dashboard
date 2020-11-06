import React from 'react';
import { formatNum } from '../../utils/format';

export default function ParkingGeneric({ site, label }) {
  if ( !site ) return null;
  
  const key = label.replace(' ', '');
  const required = site[`${key}Required`];
  const provided = site.GFA[key];
  const thresholdMet = provided >= required.Area;
  const areaString = `${formatNum(provided)} of ${formatNum(required.Area)} sqft`

  return (
    <div className='flex flex-col mb-2'>
      <span className='font-bold'>{label}</span>
      <span className={thresholdMet ? '' : 'text-red-600'}>Area: {areaString}</span>
      <span>Req. Spaces: {required.SpacesTotal}</span>
    </div>
  )
}
