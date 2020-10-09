import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { WsProvider } from './utils/ws';
import Layout from './layouts/default';
import { ToggleList } from './components/Generic';
import MapPanel from './components/MapPanel';
import MassingGoals from './components/MassingGoals';
import { Zoning, Notes } from './components/SiteDetails';
import SiteTable from './components/SiteTable';

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
    const newSites = prevState.sites !== this.state.sites && this.state.sites.length > 0
    const newScenarios = prevState.scenarios !== this.state.scenarios && this.state.scenarios.length > 0
    const siteChanged = prevState.currentSite !== this.state.currentSite
    const scenarioChanged = prevState.currentScenario !== this.state.currentScenario

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
        <div className='w-full flex flex-col'>
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
            </Route>
            <Route exact path='/build'>
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
              <MassingGoals plugin={this.state.plugin} ws={this.ws} />
              <Zoning site={sites[siteCurrent]} scenario={scenarios[scenarioCurrent]}/>
              {/* <GraphicSiteScenario
                scenarios={scenarios}
                scenarioCurrent={scenarioCurrent}
                sites={sites}
                siteCurrent={siteCurrent}
              /> */}
            </Route>
            <Route exact path='/measure'>
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
              <SiteTable pluginState={this.state.plugin} />
            </Route>
            <Route exact path='/summarize'>
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
