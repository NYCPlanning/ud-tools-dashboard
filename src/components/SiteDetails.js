import React, { Component } from 'react';

const formatNum = (n) => { return n.toLocaleString(undefined, {maximumFractionDigits:0}); };

export default function SiteDetails({ site, scenarioCurrent }) {
    const lots = site.LotIDs.join(', ')

    const zoningParams = site.Scenarios[scenarioCurrent]
    const zoningRows = Object.entries(zoningParams).map(([k, v], i) => (
        <tr key={i}>
            <td className='text-left'>{k}</td>
            <td className='text-right'>{v}</td>
        </tr>
    ))
    
    return (
        <div className='grid grid-cols-2 gap-4'>
            <div>
                <h3>Details</h3>
                <div>Using lots: {lots}</div>
                <div>Group: {site.Group}</div>
                <div>Notes: {site.Note}</div>
            </div>
            <div>
                <h3>Zoning</h3>
                <table>
                    <tbody className="divide-y divide-gray-400">
                        {zoningRows}
                    </tbody>
                </table>
                <br/>
            </div>
        </div>
    )
}

