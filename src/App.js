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
      if (message.action === "updatePluginState") {
        this.setState({'plugin': message.body});
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
      <Layout connected={this.state.connected}>

        <MapPanel
          ws={this.ws} 
          onSubmitMessage={messageString => this.submitMessage("setSiteBounds", messageString)}
          textUrl='https://raw.githubusercontent.com/NYCPlanning/ud-digital-practice/develop/docs/modules/import-model.md'
        />

        <div className='mt-8'>
          <h2>Import Site & Zoning Assumptions</h2>
          <DocumentationPage docUrl='https://raw.githubusercontent.com/NYCPlanning/ud-digital-practice/develop/docs/modules/import-assumptions.md' />

          {/* <LotsList />
          <ZonesList /> */}

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

          { this.state.plugin.SiteCurrent && 
            <SiteDetails 
              site={this.state.plugin.SiteCurrent} 
              scenarioCurrent={this.state.plugin.ScenarioCurrent.Name}
            /> 
          }
          
          
          <SiteTable site={this.state.plugin.SiteCurrent} />
        </div>

        <div className='mt-8'>
          <div className="twelve column">
            <h2>Model Sites</h2>
          </div>
        </div>
        <div className="row">
          <div className="seven columns">

          </div>
          <div className="five columns u-pull-right">
            <p>Now your model is set up to start creating building massings under the different scenarios. Select the scenario you want to work on first in the Dashboard, the tool will automatically show all the correct scenario layers and hide the others in Rhino.</p>
            <p>Based on the site definitions in the previous step, the Dashboard should also show a drop-down menu of available sites. Choose which one you'd like to work on first to begin modeling - it will default to the first in the list. If you're satisfied with what you see, run the <code>BakeCurrentMassing</code> command in Rhino and the building will be inserted into your model.</p>
            <p>Otherwise, under Parameters, you can choose to override what's set by the zoning assumptions. Be aware that there will be no record of what's overridden, and any exports will include the original zoning district when data is exported.</p>
            <p>If the massing you want cannot be acheived using the automated tools, Bake the closest thing you can get and then modify the model directly in Rhino. As long as the massing remains on the correct layers, in position on the site, it will still be calculated the same way as if it was auto-generated. Clicking the "Bake Parking" button will produce below-ground geometry for required parking area that can be modified manually in a similar way.</p>
            <p>Under "Summary" you'll see a breakdown of various development metrics in your model. Use the toggle at the top to switch between previewing the current site only versus totals & averages for the overall scenario.</p>
          </div>
        </div>

        <div className="row">
          <div className="twelve columns">
            <h2>Export Data</h2>
          </div>
        </div>
        <div className="row">
          <div className="seven columns">
            {/* <input type="file" />Template CSV
            <input type="file" />Export path */}
          </div>
          <div className="five columns u-pull-right">
            <p>If you want to use the model's data for sites and lots in another program, such as Excel, you can export it by running <code>ApplyScenario</code> followed by <code>ExportScenario</code>. This will save all available fields for each defined site to a new CSV file at the location you provide when prompted. You can then import this into Excel or use it as an external data source.</p>
            {/* <button>Export</button> */}
          </div>
        </div>

        {/* <div id="footer"></div> */}

        {/* </div> */}

      </Layout>
    )
  }
}

export default App;
