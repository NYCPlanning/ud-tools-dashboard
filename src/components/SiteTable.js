import React, { Component } from 'react';

const formatNum = (n) => { return n.toLocaleString(undefined, {maximumFractionDigits:0}); };

export default function SiteTable({ site }) {
    return (
        <div className='w-full'>
            { site && 
                <table className='w-full'>
                    <thead>
                        <tr className='text-left'>
                            <th>Residential</th>
                            <th>Community Facility</th>
                            <th>Commercial</th>
                            <th>Manufacturing</th>
                            <th className='text-gray-400'>Parking</th>
                            <th className='text-gray-400'>Loading</th>
                            <th className='text-right'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-left'>
                            <th>{formatNum(site.GFA.Residential)}</th>
                            <th>{formatNum(site.GFA.CommunityFacility)}</th>
                            <th>{formatNum(site.GFA.Commercial)}</th>
                            <th>{formatNum(site.GFA.Manufacturing)}</th>
                            <th className='text-gray-400'>{formatNum(site.GFA.ParkingProvided)}</th>
                            <th className='text-gray-400'>{formatNum(site.GFA.LoadingProvided)}</th>
                            <th className='text-right'>{formatNum(site.GFA.Total)}</th>
                        </tr>
                    </tbody>
                </table>
            }
            <small>*Areas shown are Gross Floor Area (GFA)</small>
        </div>
    )
}

