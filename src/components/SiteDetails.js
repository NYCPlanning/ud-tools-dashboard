import React from 'react';

export function Zoning({ site, scenario }) {
  if (!site || !scenario) return null
  const zoningParams = site.Scenarios[scenario.ID]
  const zoningRows = Object.entries(zoningParams).map(([k, v], i) => (
    <tr key={i}>
      <td className='text-left'>{k}</td>
      <td className='text-right'>{v}</td>
    </tr>
  ))  
  return (
    <div className='w-full mb-4'>
      <h3>Zoning</h3>
      <table className='w-full'>
        <tbody className='divide-y divide-blue-200'>
          {zoningRows}
        </tbody>
      </table>
      <br/>
    </div>
  )
}

export function Notes({ site }) {
  if (!site) return null
  const lots = site.LotIDs.join(', ')
  return (
    <div className='w-full mb-4'>
      <h3>Site Details</h3>
      <table className='w-full'>
        <tbody className='divide-y divide-blue-200'>
          <tr>
            <td>Tax Lots</td>
            <td>{lots}</td>
          </tr>
          <tr>
            <td>Group</td>
            <td>{site.Group}</td>
          </tr>
          <tr>
            <td>Notes</td>
            <td>{site.Note}</td>
          </tr>          
        </tbody>
      </table>
      <br/>
    </div>
  )
}
