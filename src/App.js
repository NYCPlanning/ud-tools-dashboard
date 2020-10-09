import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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
    const { 
      Sites: sites, 
      SiteCurrent: siteCurrent,
      Scenarios: scenarios,
      ScenarioCurrent: scenarioCurrent
    } = this.state.plugin;
    const { setScenario, setSite } = this.ws;

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
              <Redirect to='/context'/>
            </Route>
            <Route exact path="/context">
              <MapPanel
                ws={this.ws}
                onSubmitMessage={messageString =>
                  this.ws.submitMessage('setSiteBounds', messageString)
                }
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
            </Route>
            <Route exact path='/build'>z
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
              <MassingGoals plugin={this.state.plugin} ws={this.ws} />
              <SiteDetails
                site={sites[siteCurrent]}
                scenario={scenarios[scenarioCurrent]}
              />
              {/* <GraphicSiteScenario
                scenarios={scenarios}
                scenarioCurrent={scenarioCurrent}
                sites={sites}
                siteCurrent={siteCurrent}
              /> */}
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
