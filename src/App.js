import React, { Component } from 'react';
import MapPanel from './components/MapPanel';
import MassingGoals from './components/MassingGoals';
import ScenariosList from './components/ScenariosList';
import SiteDetails from './components/SiteDetails';
import SitesList from './components/SitesList';
import SiteTable from './components/SiteTable';
import Layout from './layouts/default';
import { WsProvider } from './utils/ws';

class App extends Component {
  constructor(props){
    super();
    this.state = {
      connected: false,
      plugin: {},
      scenarios: [],
      sites: [],
      currentScenario: 0,
      currentSite: 0,
      result: {
        GFA: {
          Residential: 0,
          CommunityFacility: 0,
          Commercial: 0,
          Manufacturing: 0,
          ParkingProvided: 0,
          LoadingProvided: 0,
          Total: 0
        }
      },
      message: {}
    };
    this.ws = {}
  };

  componentWillUpdate(prevProps, prevState) {
    const newSites = prevState.sites != this.state.sites && this.state.sites.length > 0
    const newScenarios = prevState.scenarios != this.state.scenarios && this.state.scenarios.length > 0
    const siteChanged = prevState.currentSite != this.state.currentSite
    const scenarioChanged = prevState.currentScenario != this.state.currentScenario

    if (siteChanged || scenarioChanged || newSites || newScenarios ) {
      const messageBody = {
        site: this.state.sites[this.state.currentSite],
        scenario: this.state.scenarios[this.state.currentSite]
      }
      this.ws.submitMessage('setCurrentSiteScenario', JSON.stringify(messageBody))
    }
  }

  componentDidMount() {
    this.ws = new WsProvider(this, process.env.REACT_APP_WEBSOCKET_URL);
  }

  render() {
    const modes = [];
    return (
      <Layout 
        connected={this.state.connected}
        version={this.state.plugin.Version}
        buildDate={this.state.plugin.BuildDate}
        tryReconnect={this.ws.tryReconnect}
      >
        <div id='mode-container' className='w-full flex flex-col'>
          <MapPanel
            ws={this.ws} 
            onSubmitMessage={messageString => this.ws.submitMessage('setSiteBounds', messageString)} 
          />
          <SitesList 
            sites={this.state.plugin.Sites} 
            current={this.state.plugin.SiteCurrent}
            setSite={this.ws.setSite}
          />
          <ScenariosList 
            scenarios={this.state.plugin.Scenarios} 
            current={this.state.plugin.ScenarioCurrent}
            setScenario={this.ws.setScenario}
          />
          <MassingGoals ws={this.ws}/>

          { this.state.plugin.SiteCurrent && this.state.plugin.ScenarioCurrent && 
            <SiteTable pluginState={this.state.plugin} />
          }
          { this.state.plugin.SiteCurrent && this.state.plugin.ScenarioCurrent && 
            <SiteDetails 
              site={this.state.plugin.SiteCurrent} 
              scenarioCurrent={this.state.plugin.ScenarioCurrent.Name}
            />
          }
        </div>
      </Layout>
    )
  }
}

export default App;
