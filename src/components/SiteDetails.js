import React from 'react';

export function Zoning({ site, scenario }) {
  if (!site || !scenario) return <div/>
  const zoningParams = site.Scenarios[scenario.ID]
  const zoningRows = Object.entries(zoningParams).map(([k, v], i) => (
    <tr key={i}>
      <td className='text-left'>{k}</td>
      <td className='text-right'>{v}</td>
    </tr>
  ))  
  return (
    <div className='mb-4'>
      <h3>Zoning</h3>
      <table>
        <tbody className='divide-y divide-gray-400'>
          {zoningRows}
        </tbody>
      </table>
      <br/>
    </div>
  )
}

export function Notes({ site }) {
  if (!site) return <div/>
  const lots = site.LotIDs.join(', ')
  return (
    <div className='mb-4 w-full'>
      <hr/>
      <div className='my-4 font-bold'>Details</div>
      <table className='w-full'>
        <tbody className='divide-y divide-gray-400'>
          <tr>
            <td>Lots</td>
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
