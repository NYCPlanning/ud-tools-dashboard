import React from 'react';
import { ToggleList } from '../Generic';
import SiteTable from '../SiteTable';
import ParkingGeneric from './Parking';
import Dimensions from './Dimensions';
import UnitCounts from './UnitCounts';

export default function Measure({ state, ws: { setSite, setScenario }}) {
  if ( !state.plugin ) return <div>Loading</div>
  const { plugin: { Sites: sites, SiteCurrent: siteCurrent, Scenarios: scenarios, ScenarioCurrent: scenarioCurrent }} = state;
  const site = sites[siteCurrent];
  const scenario = scenarios[scenarioCurrent];

  return (
    <div>
      <ToggleList
        label='Scenario'
        list={scenarios}
        current={scenarioCurrent}
        set={setScenario}
      />
      <ToggleList
        label='Site'
        list={sites}
        current={siteCurrent}
        set={setSite}
      />
      <SiteTable site={site} scenarioCurrent={scenario} />
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
        <Dimensions site={site} />
        <UnitCounts site={site} />
        <ParkingGeneric site={site} label={'Parking'}/>
        <ParkingGeneric site={site} label={'Loading'}/>
        <ParkingGeneric site={site} label={'Bike Parking'}/>
      </div>
    </div>
  );
};
