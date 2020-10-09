import React from 'react';
import { formatNum, formatFAR } from '../utils/format';

export default function SitesList({ sites }) {
  const rows = sites.map((s, i) => (
    <tr key={i}>
      <td className='px-4'>{s.ID}</td>
      <td className='px-4'>{formatNum(s.ZFA.Residential)}</td>
      <td className='px-4'>{formatNum(s.ZFA.CommunityFacility)}</td>
      <td className='px-4'>{formatNum(s.ZFA.Commercial)}</td>
      <td className='px-4'>{formatNum(s.ZFA.Manufacturing)}</td>
      <td className='px-4'>{formatNum(s.ZFA.Total)}</td>
      <td className='px-4'>{s.Counts.ResidentialUnits}</td>
    </tr>
  ))  
  return (
    <div className='mb-4'>
      <h3>Sites</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>R</th>
            <th>CF</th>
            <th>C</th>
            <th>M</th>
            <th>Total</th>
            <th>R Units</th>
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
