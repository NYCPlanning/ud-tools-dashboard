import React, { Component } from 'react'
import CurrentSiteScenario from './components/CurrentSiteScenario'
import SiteTable from './components/SiteTable'
import SiteDetails from './components/SiteDetails'
import Status from './components/Status'
import MapPanel from './components/MapPanel'
import SitesList from './components/SitesList'
import ScenariosList from './components/ScenariosList'
import ZonesList from './components/ZonesList'
import DocumentationPage from './components/DocumentationPage'
import SectionHeading from './components/SectionHeading'
import FAR from './components/FAR'
import VisualFAR from './components/VisualFAR'

import Layout from './layouts/default'

// url for the websockets service
const URL = 'ws://localhost:4649/Dashboard'

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
      //messages: []
    };
  };

  // websockets
  ws = new WebSocket(URL)

  setConnected = c => 
    this.setState(state => ({ connected: c}))

  setScenario = id => 
    this.submitMessage('setScenario', id)

  setSite = id => 
    this.submitMessage('setSite', id)
    //this.setState(stats => ({ currentSite: i }))  

  // addMessage = message =>
  //   this.setState(state => ({ messages: [message, ...state.messages] }))

  submitMessage = (action, messageString) => {
    console.log("triggered update message")
    console.log(action, messageString)
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { action: action, body: messageString }
    //const message = messageString
    this.ws.send(JSON.stringify(message))
    //this.addMessage(message)
  }

  componentDidMount() {
    const cachedState = localStorage.getItem('plugin');
    if (cachedState) {
      this.setState({'plugin': JSON.parse(cachedState)});
    }

    this.ws.onopen = () => {
      //this.addMessage("Connected...")
      console.log("WS connected")
      this.setConnected(true);
    }

    this.ws.onmessage = evt => {
      let message = JSON.parse(evt.data);
      message.body = JSON.parse(message.body);
      //this.setState(state => ({message: message}));
      console.log(message);
      // then do different things to handle input message

      // receive plugin state updates
      // and persist to local storage in case of reload
      if (message.action === "updatePluginState") {
        this.setState({'plugin': message.body});
        localStorage.setItem('plugin', JSON.stringify(message.body));
      }

      // if (message.action === "updateSiteScenarioList") {
      //   this.setState(message.body);
      // }

      // if (message.action === "updateCurrentSiteObject") {
      //   console.log(message.body)
      //   //this.setState({currentSite: message.body});
      // }
      //const message = evt.data
      //this.addMessage(message)
    }

    this.ws.onclose = () => {
      console.log('WS disconnected')
      this.setConnected(false);

      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }

    this.ws.onerror = () => {
      console.log("WS error");
      this.setConnected(false);
    }
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
      this.submitMessage('setCurrentSiteScenario', JSON.stringify(messageBody))
    }
  }

  render() {
    return (
      <Layout 
        connected={this.state.connected}
        version={this.state.plugin.Version}
        buildDate={this.state.plugin.BuildDate}
      >

        <div className="adjust-top">
          <SectionHeading heading='Import Model'/>
          <DocumentationPage docUrl='https://raw.githubusercontent.com/NYCPlanning/ud-digital-practice/develop/docs/modules/import-model.md' />
          <MapPanel
            ws={this.ws} 
            onSubmitMessage={messageString => this.submitMessage("setSiteBounds", messageString)}
          />
        </div>

        <div>
          <SectionHeading heading='Import Site & Zoning Assumptions' />
          <DocumentationPage docUrl='https://raw.githubusercontent.com/NYCPlanning/ud-digital-practice/develop/docs/modules/import-assumptions.md' />

          {/* <LotsList />
          <ZonesList /> */}

          <SectionHeading heading='Site Details' />
          <SitesList 
            sites={this.state.plugin.Sites} 
            current={this.state.plugin.SiteCurrent}
            setSite={this.setSite}
          />
          <ScenariosList 
            scenarios={this.state.plugin.Scenarios} 
            current={this.state.plugin.ScenarioCurrent}
            setScenario={this.setScenario}
          />
          {/* <ZonesList sites={this.state.sites}/> */}
          { this.state.plugin.SiteCurrent && this.state.plugin.ScenarioCurrent && 
            <SiteDetails 
              site={this.state.plugin.SiteCurrent} 
              scenarioCurrent={this.state.plugin.ScenarioCurrent.Name}
            />
          }
          { this.state.plugin.SiteCurrent && this.state.plugin.ScenarioCurrent && 
            // <FAR pluginState={this.state.plugin} />
            <VisualFAR pluginState={this.state.plugin} />
          }
          <br/>
          <SiteTable site={this.state.plugin.SiteCurrent} />
        </div>

        <div className='mt-8'>
            <h2>Model Sites</h2>
            <DocumentationPage docUrl='https://raw.githubusercontent.com/NYCPlanning/ud-digital-practice/develop/docs/modules/model-sites.md' />
        </div>

        <div className='mt-8'>
            <h2>Export Data</h2>
            <DocumentationPage docUrl='https://raw.githubusercontent.com/NYCPlanning/ud-digital-practice/develop/docs/modules/export-data.md' />
        </div>

        {/* <div id="footer"></div> */}

        {/* </div> */}

      </Layout>
    )
  }
}

export default App;
