import React from 'react'

export default function SitesList({ sites, setSite, current }) {
  return (
    <div className='flex'>
      <h3 className='m-2 ml-0'>Site:</h3>
      {sites &&
          sites.map((site, i) =>
            <div key={site.ID} onClick={() => setSite(site.ID)} className={`cursor-pointer p-1 py-0 m-2 ${ current && site.ID === current.ID ? 'bg-black text-white' : 'bg-gray-200' }`}>
              {site.ID}
            </div>
          )
      }
    </div>
  )
}
