import React from 'react';

export default function UnitCounts({ site }) {
  if ( !site ) return null;

  return (
    <div className='flex flex-col mb-2'>
      <span className='font-bold'>Units</span>
      <span>Hotel Rooms: {site.Counts.HotelRooms}</span>
      <span>Units: {site.Counts.ResidentialUnits}</span>
      <span>Affordable Units @ 25%: {site.Counts.ResidentialUnitsAffordable25}</span>
    </div>
  )
};
