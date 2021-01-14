import React from 'react';
import DownloadExcel from './DownloadExcel';
import GenerateRWCDS from './GenerateRWCDS';
import ToggleList from '../ToggleList';
import SitesList from './SitesList';

export default function Summary({ state, ws }) {
  if (!state || !ws ) return;

  const { setScenario } = ws;
  const { 
    Sites: sites, 
    Scenarios: scenarios,
    ScenarioCurrent: scenarioCurrent
  } = state.plugin;

  if (sites.length < 1) return <span>No Sites defined.</span>
  else return (
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
