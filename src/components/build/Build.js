import React from 'react';
import { ToggleList } from '../Generic';
import MassingGoals from './MassingGoals';
import { Zoning, Notes } from '../SiteDetails';

export default function Build({ state, ws}) {
  if ( !state.plugin ) return <div>Loading</div>
  const { setSite, setScenario } = ws;
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
      <hr/>
      <MassingGoals plugin={state.plugin} ws={ws} />
      <hr/>
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


