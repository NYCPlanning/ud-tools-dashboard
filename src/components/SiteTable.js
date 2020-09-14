import React from 'react';
import { formatNum, formatFAR } from '../utils/format';
import * as color from '../utils/color';
import VisualFAR from './VisualFAR';

export default function SiteTable({ pluginState }) {
    const zone = pluginState.SiteCurrent.Scenarios[pluginState.ScenarioCurrent.Name];
    const site = pluginState.SiteCurrent;
    const zoningLotArea = site.ZoningLot.Area;
    const utilized = {
      R: site.ZFA.Residential / zoningLotArea,
      CF: site.ZFA.CommunityFacility / zoningLotArea,
      C: site.ZFA.Commercial / zoningLotArea,
      M: site.ZFA.Manufacturing / zoningLotArea,
      T: site.ZFA.Total / zoningLotArea
    };
    const allowed = {
      R: zone.ResidentialFAR,
      CF: zone.CommunityFacilityFAR,
      C: zone.CommercialFAR,
      M: zone.ManufacturingFAR,
      T: Math.max(zone.ResidentialFAR, zone.CommunityFacilityFAR, zone.CommercialFAR, zone.ManufacturingFAR),
    };
  
    return (
        <div className='w-full'>
            { site && 
                <div className='w-full flex justify-between'>
                    <div className='flex flex-col justify-center items-center'>
                        <h3>R</h3>
                        <small>{formatNum(site.GFA.Residential)}</small>
                        <small>{formatNum(site.ZFA.Residential)}</small>
                        <VisualFAR data={[utilized.R/allowed.R, 1]} color={color.luYellow}/>
                        <span className={utilized.R > allowed.R ? 'text-red-500 font-bold' : ''}>
                            <small>{formatFAR(utilized.R)} of {formatFAR(allowed.R)}</small>
                        </span>        
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h3>CF</h3>
                        <small>{formatNum(site.GFA.CommunityFacility)}</small>
                        <small>{formatNum(site.ZFA.CommunityFacility)}</small>
                        <VisualFAR data={[utilized.CF/allowed.CF, 1]} color={color.luBlue}/>
                        <span className={utilized.CF > allowed.CF ? 'text-red-500 font-bold' : ''}>
                            <small>{formatFAR(utilized.CF)} of {formatFAR(allowed.CF)}</small>
                        </span>  
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h3>C</h3>
                        <small>{formatNum(site.GFA.Commercial)}</small>
                        <small>{formatNum(site.ZFA.Commercial)}</small>
                        <VisualFAR data={[utilized.C/allowed.C, 1]} color={color.luRed}/>
                        <span className={utilized.C > allowed.C ? 'text-red-500 font-bold' : ''}>
                            <small>{formatFAR(utilized.C)} of {formatFAR(allowed.C)}</small>
                        </span>  
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h3>M</h3>
                        <small>{formatNum(site.GFA.Manufacturing)}</small>
                        <small>{formatNum(site.ZFA.Manufacturing)}</small>
                        <VisualFAR data={[utilized.M/allowed.M, 1]} color={color.luPurple}/>
                        <span className={utilized.M > allowed.M ? 'text-red-500 font-bold' : ''}>
                            <small>{formatFAR(utilized.M)} of {formatFAR(allowed.M)}</small>
                        </span>  
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h3>Total</h3>
                        <small>{formatNum(site.GFA.Total)} (GFA)</small>
                        <small>{formatNum(site.ZFA.Total)} (ZFA)</small>
                        <VisualFAR data={[utilized.T/allowed.T, 1]} color={'black'}/>
                        <span className={utilized.T > allowed.T ? 'text-red-500 font-bold' : ''}>
                            <small>{formatFAR(utilized.T)} of {formatFAR(allowed.T)}</small>
                        </span>  
                    </div>
                </div>
            }
        </div>
    )
}

