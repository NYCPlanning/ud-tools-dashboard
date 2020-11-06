import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { WsProvider } from './utils/ws';
import Layout from './layouts/default';
import Build from './components/build/Build';
import Context from './components/context/Context';
import Measure from './components/measure/Measure';
import Setup from './components/setup/Setup';
import Summary from './components/summary/Summary';

class App extends Component {
  stateTemplate = {
    connected: false,
    plugin: {
      Scenarios: [],
      Sites: [],
      ScenarioCurrent: 0,
      SiteCurrent: 0
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

  componentDidUpdate(prevProps, prevState) {
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
    const { setScenario, setSite } = this.ws;

    return (
      <Layout 
        connected={this.state.connected}
        version={this.state.plugin.Version}
        buildDate={this.state.plugin.BuildDate}
        tryReconnect={this.ws.tryReconnect}
      >
        <div className='w-full flex flex-col mb-16'>
          <Switch>
            <Route exact path="/">
              <Redirect to='/context'/>
            </Route>
            <Route exact path="/context">
              <Context ws={this.ws} />
            </Route>
            <Route exact path="/setup">
              <Setup state={this.state} ws={this.ws} />
            </Route>
            <Route exact path='/build'>
              <Build state={this.state} ws={this.ws} />
            </Route>
            <Route exact path='/measure'>
              <Measure state={this.state} ws={this.ws} />
            </Route>
            <Route exact path='/summarize'>
              <Summary state={this.state} ws={this.ws} />
            </Route>
          </Switch>
          </div>
      </Layout>
    )
  }
}

export default App;
