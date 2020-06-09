import React from 'react'
import { formatNum } from '../utils/format'

export default function FAR({ pluginState }) {
  const zoningLotArea = pluginState.SiteCurrent.ZoningLotArea
  const zoning = pluginState.SiteCurrent.Scenarios[pluginState.ScenarioCurrent.Name]
  const site = pluginState.SiteCurrent

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
                  <th className='w-1/6'>Total</th>
              </tr>
          </thead>
          <tbody>
              <tr className='text-left'>
                  <th>{site.ZFA.Residential / zoningLotArea}</th>
                  <th>{site.ZFA.CommunityFacility / zoningLotArea}</th>
                  <th>{site.ZFA.Commercial / zoningLotArea}</th>
                  <th>{site.ZFA.Manufacturing / zoningLotArea}</th>
                  <th>{0}</th>
              </tr>
              <tr className='text-left'>
                  <th>{zoning.ResidentialFAR}</th>
                  <th>{zoning.CommunityFacilityFAR}</th>
                  <th>{zoning.CommercialFAR}</th>
                  <th>{zoning.ManufacturingFAR}</th>
                  <th>{0}</th>
              </tr>
          </tbody>
        </table>
      }
    </div>
  )
}
