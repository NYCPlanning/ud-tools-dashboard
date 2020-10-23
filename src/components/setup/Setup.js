import React from 'react';
import { ToggleList } from '../Generic';
import { Notes } from '../SiteDetails';

export default function Summary({ state, ws }) {
  if (!state || !ws ) return;

  const { setScenario, setSite } = ws;
  const { 
    Sites: sites, 
    SiteCurrent: siteCurrent,
    Scenarios: scenarios,
    ScenarioCurrent: scenarioCurrent
  } = state.plugin;

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
      <Notes site={sites[siteCurrent]}/>
    </div>
  )
};
