import React, { useContext } from 'react'
import { AssumptionsContext } from '../../App'
import { formatNum } from '../../utils/format'

export default function ParkingGeneric({ site, label }) {
  const assumptions = useContext(AssumptionsContext)
  if ( !site ) return null;
  
  const key = label.replace(' ', '');
  const required = site[`${key}Required`];
  const providedArea = site.GFA[key];
  const providedSizeAssumption = assumptions[`${key.toUpperCase()}SPACEAREA`]
  const providedSpaces = providedArea / providedSizeAssumption
  const thresholdMet = providedArea >= required.Area;
  const areaString = `${formatNum(providedArea)} of ${formatNum(required.Area)} sqft`

  return (
    <div className='flex flex-col mb-2'>
      <span className='font-bold'>{label}</span>
      <span className={thresholdMet ? '' : 'text-red-600'}>Area: {areaString}</span>
      <span>Spaces: {formatNum(providedSpaces)}
        <span className='assumption'> @ {providedSizeAssumption} sqft</span>    
      </span>
      <span>Req. Spaces: {required.SpacesTotal}</span>
    </div>
  )
}
