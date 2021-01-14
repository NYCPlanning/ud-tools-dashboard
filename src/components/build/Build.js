import React from 'react';
import ToggleList from '../ToggleList';
import { Notes } from '../SiteDetails';
import GenerateButton from './GenerateButton';
import MassingGoals from './MassingGoals';
import { Zoning } from '../SiteDetails';

export default function Build({ state, ws}) {
  if ( !state.plugin ) return <div>Loading</div>
  const { setSite, setScenario } = ws;
  const { 
    plugin: { 
      Sites: sites, 
      SiteCurrent: siteCurrent, 
      Scenarios: scenarios, 
      ScenarioCurrent: scenarioCurrent 
    }
  } = state;

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
      <MassingGoals plugin={state.plugin} ws={ws} />
      {/* <GenerateButton ws={ws} label='Envelope' />
      <GenerateButton ws={ws} label='Massing' /> */}
      <Notes site={sites[siteCurrent]}/>
      <Zoning site={sites[siteCurrent]} scenario={scenarios[scenarioCurrent]}/>
      {/* <GraphicSiteScenario
        scenarios={scenarios}
        scenarioCurrent={scenarioCurrent}
        sites={sites}
        siteCurrent={siteCurrent}
      /> */}
    </div>
  );
};



