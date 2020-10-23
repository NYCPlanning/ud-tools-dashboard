import React from 'react';
import { ToggleList } from '../Generic';
import SiteTable from '../SiteTable';
import PhysicalMeasurements from './PhysicalMeasurements';

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
      <PhysicalMeasurements site={site} />
    </div>
  );
};
