import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MapPanel from './components/MapPanel';
import GraphicMassingGoals from './components/GraphicMassingGoals';
import MassingGoals from './components/MassingGoals';
import GraphicSiteScenario from './components/GraphicSiteScenario';
import { Dropdown, ToggleList } from './components/Generic';
import ScenariosList from './components/ScenariosList';
import SiteDetails from './components/SiteDetails';
import SitesList from './components/SitesList';
import SiteTable from './components/SiteTable';
import Layout from './layouts/default';
import { WsProvider } from './utils/ws';
// import { ScenarioDropdown } from './components/SiteScenarioDropdown';

class App extends Component {
  stateTemplate = {
    connected: false,
    plugin: {
      Scenarios: [],
      Sites: [],
    },
  };

  constructor(props){
    super();
    this.state = this.stateTemplate;
    this.ws = {}
  };

  resetState() {
    this.setState(state => (this.stateTemplate))
  }

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
    const scenarios = this.state.plugin.Scenarios;
    const scenarioCurrent = this.state.plugin.ScenarioCurrent;
    const setScenario = this.ws.setScenario;
    const sites = this.state.plugin.Sites;
    const siteCurrent = this.state.plugin.SiteCurrent;
    const setSite = this.ws.setSite;

    const grid = scenarios.map((scenario, i) => (
      sites.map((site) => (site.ID))
    ));
    const location = [0,0]

    return (
      <Layout 
        connected={this.state.connected}
        version={this.state.plugin.Version}
        buildDate={this.state.plugin.BuildDate}
        tryReconnect={this.ws.tryReconnect}
      >
          <div id='mode-container' className='w-full flex flex-col'>

          <Switch>
            <Route exact path="/">
              </Route>
              <Route exact path="/context">
                <MapPanel
                  ws={this.ws} 
                  onSubmitMessage={messageString => this.ws.submitMessage('setSiteBounds', messageString)} 
                />
              </Route>
              <Route exact path="/setup">
                <ToggleList 
                  label='Scenarios'
                  list={scenarios}
                  current={scenarioCurrent}
                  set={setScenario}
                />
                <ToggleList 
                  label='Sites'
                  list={sites}
                  current={siteCurrent}
                  set={setSite}
                />
                <SiteDetails 
                  site={sites[siteCurrent]} 
                  scenario={scenarios[scenarioCurrent]}
                />
              </Route>
              <Route exact path='/build'>
                <ToggleList 
                  label='Scenarios'
                  list={scenarios}
                  current={scenarioCurrent}
                  set={setScenario}
                />
                <ToggleList 
                  label='Sites'
                  list={sites}
                  current={siteCurrent}
                  set={setSite}
                />
                <MassingGoals ws={this.ws} />
                {/* <GraphicSiteScenario
                  scenarios={scenarios}
                  scenarioCurrent={scenarioCurrent} 
                  sites={sites}
                  siteCurrent={siteCurrent}
                /> */}
                {/* <GraphicMassingGoals ws={this.ws}/>
                { this.state.plugin.SiteCurrent && this.state.plugin.ScenarioCurrent && 
                  <SiteDetails 
                    site={this.state.plugin.SiteCurrent} 
                    scenarioCurrent={this.state.plugin.ScenarioCurrent.Name}
                  />
                } */}
              </Route>
              <Route exact path='/measure'>
                <Dropdown label='Site' list={sites} current={siteCurrent} set={setSite}/>
                <Dropdown label='Scenario' list={scenarios} current={scenarioCurrent} set={setScenario}/>
                <SiteTable pluginState={this.state.plugin} />
              </Route>
              <Route exact path='/summarize'>
                <Dropdown label='Site' list={sites} current={siteCurrent} set={setSite}/>
                <Dropdown label='Scenario' list={scenarios} current={scenarioCurrent} set={setScenario}/>
              </Route>
          </Switch>
          </div>
          <br/>
          <br/>
          <br/>
      </Layout>
    )
  }
}

export default App;
