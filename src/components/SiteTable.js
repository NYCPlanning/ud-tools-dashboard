import React, { Component } from 'react'
import { formatNum } from '../utils/format'

export default function SiteTable({ site }) {
    return (
        <div className='w-full'>
            { site && 
                <table className='w-full table-fixed'>
                    <thead>
                        <tr className='text-left'>
                            <th className='w-1/6'>R</th>
                            <th className='w-1/6'>CF</th>
                            <th className='w-1/6'>C</th>
                            <th className='w-1/6'>M</th>
                            <th className='w-1/6 text-gray-400'>Parking</th>
                            {/* <th className='text-gray-400'>Loading</th> */}
                            <th className='w-1/6'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-left'>
                            <th>{formatNum(site.GFA.Residential)}</th>
                            <th>{formatNum(site.GFA.CommunityFacility)}</th>
                            <th>{formatNum(site.GFA.Commercial)}</th>
                            <th>{formatNum(site.GFA.Manufacturing)}</th>
                            <th className='text-gray-400'>{formatNum(site.GFA.ParkingProvided)}</th>
                            {/* <th className='text-gray-400'>{formatNum(site.GFA.LoadingProvided)}</th> */}
                            <th>{formatNum(site.GFA.Total)}</th>
                        </tr>
                    </tbody>
                </table>
            }
            <small>*Areas shown are Gross Floor Area (GFA)</small>
        </div>
    )
}

