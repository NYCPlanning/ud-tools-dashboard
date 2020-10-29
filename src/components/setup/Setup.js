import React from 'react';
import { ToggleList } from '../Generic';
import { Notes } from '../SiteDetails';
import AddSite from './AddSite';
import AddScenario from './AddScenario';

export default function Summary({ state, ws }) {
  if (!state || !ws ) return;

  const { setScenario, setSite } = ws;
  const { 
    Sites: sites, 
    SiteCurrent: siteCurrent,
    Scenarios: scenarios,
    ScenarioCurrent: scenarioCurrent,
    Zones: zones,
  } = state.plugin;
  
  const setZone = () => {
    console.log('set zone')
  }

  const zoneCurrent = 0;

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
      <ToggleList
        label='Zone'
        list={zones}
        current={zoneCurrent}
        set={setZone}
      />
      <AddScenario ws={ws}/>
      {/* <AddSite scenarios={scenarios} ws={ws}/> */}
      <Notes site={sites[siteCurrent]}/>
    </div>
  )
};
