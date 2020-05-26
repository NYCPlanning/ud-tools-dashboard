import React from 'react'

export default function ZonesList({ zones }) {
  const listItems = zones.map((zone) =>
    <div key={zone} className='bg-gray-300 p-1 py-0 m-2'>
      {zone}
    </div>
  )
  return (
    <div className='flex'>
      <h3 className='m-2 ml-0'>Zones:</h3>
      {listItems}
    </div>
  )
}
