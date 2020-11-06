import React from 'react';
import { formatNum, formatFAR } from '../../utils/format';

export default function SitesList({ sites }) {
  const rows = sites.map((s, i) => (
    <tr key={i}>
      <td className='pr-4 text-left'>{s.ID}</td>
      <td className='pr-4 text-left'>{formatNum(s.ZFA.Residential)}</td>
      <td className='pr-4 text-left'>{formatNum(s.ZFA.CommunityFacility)}</td>
      <td className='pr-4 text-left'>{formatNum(s.ZFA.Commercial)}</td>
      <td className='pr-4 text-left'>{formatNum(s.ZFA.Manufacturing)}</td>
      <td className='pr-4 text-left'>{formatNum(s.ZFA.Total)}</td>
      <td className='pr-4 text-left'>{s.Counts.ResidentialUnits}</td>
    </tr>
  ))  
  return (
    <div className='mb-4 w-full'>
      <h3>Sites</h3>
      <table className='w-full'>
        <thead>
          <tr>
            <th className='text-left'>ID</th>
            <th className='text-left'>R</th>
            <th className='text-left'>CF</th>
            <th className='text-left'>C</th>
            <th className='text-left'>M</th>
            <th className='text-left'>Total</th>
            <th className='text-left'>R Units</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-400'>
          {rows}
        </tbody>
      </table>
      <br/>
    </div>
  )
}
