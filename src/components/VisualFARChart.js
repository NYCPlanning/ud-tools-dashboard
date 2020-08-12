import React from 'react';
import VisualFAR from './VisualFAR';
import * as color from '../utils/color';

export default function VisualFARChart({ pluginState }) {
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
    <div className='label flex justify-between'>
      <VisualFAR data={[utilized.R/allowed.R, 1]} color={color.luYellow}/>
      <VisualFAR data={[utilized.CF/allowed.CF, 1]} color={color.luBlue}/>
      <VisualFAR data={[utilized.C/allowed.C, 1]} color={color.luRed}/>
      <VisualFAR data={[utilized.M/allowed.M, 1]} color={color.luPurple}/>
      <VisualFAR data={[utilized.T/allowed.T, 1]} color={'black'}/>
    </div>
  )
};
