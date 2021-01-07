import React, { useContext } from 'react'
import { AssumptionsContext } from '../../App'

export default function UnitCounts({ site }) {
  const assumptions = useContext(AssumptionsContext)
  if ( !site ) return null
  else return (
    <div className='flex flex-col mb-2'>
      <span className='font-bold'>Units</span>
      <span>Hotel Rooms: {site.Counts.HotelRooms}
        <span className='assumption'> @ {assumptions.HOTELROOMAREA} sqft</span>
      </span>
      <span>Units: {site.Counts.ResidentialUnits}
        <span className='assumption'> @ {assumptions.RESIDENTIALUNITAREA} sqft</span>
      </span>
      {/* <span>Affordable Units @ 25%: {site.Counts.ResidentialUnitsAffordable25}</span> */}
    </div>
  )
}
