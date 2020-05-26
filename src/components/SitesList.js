import React from 'react'

export default function SitesList({ sites, setSite, current }) {
  const listItems = sites.map((site, i) =>
    <div 
      key={site} 
      className={`cursor-pointer p-1 py-0 m-2 ${ i === current ? 'bg-black text-white' : 'bg-gray-200' }`}
      onClick={() => setSite(i)}
    >
      {site}
    </div>
  )
  return (
    <div className='flex'>
      <h3 className='m-2 ml-0'>Sites:</h3>
      {listItems}
    </div>
  )
}
