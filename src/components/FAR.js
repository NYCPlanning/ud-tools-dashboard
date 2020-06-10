import React from 'react';
import { formatFAR } from '../utils/format';

export default function FAR({ pluginState }) {
  const zoningLotArea = pluginState.SiteCurrent.ZoningLotArea;
  const zoning = pluginState.SiteCurrent.Scenarios[pluginState.ScenarioCurrent.Name];
  const site = pluginState.SiteCurrent;
  const maxFAR = Math.max(zoning.ResidentialFAR, zoning.CommunityFacilityFAR, zoning.CommercialFAR, zoning.ManufacturingFAR);

  return (
    <div className='flex'>
      {zoning &&
        <table className='w-full table-fixed'>
          <thead>
              <tr className='text-left'>
                  <th className='w-1/6'>R</th>
                  <th className='w-1/6'>CF</th>
                  <th className='w-1/6'>C</th>
                  <th className='w-1/6'>M</th>
                  <th className='w-1/6'></th>
                  <th className='w-1/6'>Total</th>
              </tr>
          </thead>
          <tbody>
              <tr className='text-left'>
                  <th>{formatFAR(site.ZFA.Residential / zoningLotArea)}</th>
                  <th>{formatFAR(site.ZFA.CommunityFacility / zoningLotArea)}</th>
                  <th>{formatFAR(site.ZFA.Commercial / zoningLotArea)}</th>
                  <th>{formatFAR(site.ZFA.Manufacturing / zoningLotArea)}</th>
                  <th>{0}</th>
                  <th>{formatFAR(site.ZFA.Total / zoningLotArea)}</th>
              </tr>
              <tr className='text-left'>
                  <th>{formatFAR(zoning.ResidentialFAR)}</th>
                  <th>{formatFAR(zoning.CommunityFacilityFAR)}</th>
                  <th>{formatFAR(zoning.CommercialFAR)}</th>
                  <th>{formatFAR(zoning.ManufacturingFAR)}</th>
                  <th>{0}</th>
                  <th>{formatFAR(maxFAR)}</th>
              </tr>
          </tbody>
        </table>
      }
    </div>
  )
};
