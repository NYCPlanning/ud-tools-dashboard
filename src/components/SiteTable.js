import React from 'react';
import { formatNum } from '../utils/format';
import * as color from '../utils/color';
import VisualFAR from './VisualFAR';

export default function SiteTable({ pluginState }) {
    const zone = pluginState.SiteCurrent.Scenarios[pluginState.ScenarioCurrent.Name];
    const site = pluginState.SiteCurrent;
    const zoningLotArea = site.ZoningLotArea;
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
                        <VisualFAR data={[utilized.R, allowed.R]} color={color.luYellow}/>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h3>CF</h3>
                        <small>{formatNum(site.GFA.CommunityFacility)}</small>
                        <small>{formatNum(site.ZFA.CommunityFacility)}</small>
                        <VisualFAR data={[utilized.CF, allowed.CF]} color={color.luBlue}/>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h3>C</h3>
                        <small>{formatNum(site.GFA.Commercial)}</small>
                        <small>{formatNum(site.ZFA.Commercial)}</small>
                        <VisualFAR data={[utilized.C, allowed.C]} color={color.luRed}/>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h3>M</h3>
                        <small>{formatNum(site.GFA.Manufacturing)}</small>
                        <small>{formatNum(site.ZFA.Manufacturing)}</small>
                        <VisualFAR data={[utilized.M, allowed.M]} color={color.luPurple}/>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h3>Total</h3>
                        <small>{formatNum(site.GFA.Total)} (GFA)</small>
                        <small>{formatNum(site.ZFA.Total)} (ZFA)</small>
                        <VisualFAR data={[utilized.T, allowed.T]} color={'black'}/>
                    </div>
                </div>
            }
        </div>
    )
}

