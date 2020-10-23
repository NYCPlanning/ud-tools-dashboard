import React from 'react';
import DownloadExcel from './DownloadExcel';
import GenerateRWCDS from './GenerateRWCDS';
import { ToggleList, Notes } from '../Generic';
import SitesList from './SitesList';

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
      <SitesList sites={sites} />
      <GenerateRWCDS ws={ws} />
      <DownloadExcel plugin={state.plugin} rwcds={state.rwcds} />
    </div>
  )
};
