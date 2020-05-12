import React, { Component } from 'react'
import CurrentSiteScenario from './components/CurrentSiteScenario'
import SiteTable from './components/SiteTable'
import Status from './components/Status'
import MapPanel from './components/MapPanel'

// url for the websockets service
const URL = 'ws://localhost:4649/Dashboard'

class App extends Component {
  constructor(props){
    super();
    this.state = {
      connected: false,
      scenarios: [],
      sites: [],
      currentScenario: {},
      currentSite: {},
      message: {}
      //messages: []
    };
  };

  // websockets

  ws = new WebSocket(URL)

  componentDidMount() {
    this.ws.onopen = () => {
      //this.addMessage("Connected...")
      console.log("WS connected")
      this.setConnected(true);
    }

    this.ws.onmessage = evt => {
      let message = JSON.parse(evt.data);
      message.body = JSON.parse(message.body);
      this.setState(state => ({message: message}));
      console.log(message);
      // then do different things to handle input message

      if (message.action === "updateSiteScenarioList") {
        this.setState(message.body);
      }

      if (message.action === "updateCurrentSiteObject") {
        this.setState({currentSite: message.body});
      }
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

  setConnected = c => 
    this.setState(state => ({ connected: c}))

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

  render() {
    return (
      <div className="flex flex-col h-screen w-full p-4 divide-y-8 divide-white">

        <Status connected={this.state.connected} />
        <MapPanel ws={this.ws} 
                  onSubmitMessage={messageString => this.submitMessage("setSiteBounds", messageString)}
                  textUrl='https://raw.githubusercontent.com/NYCPlanning/ud-digital-practice/master/docs/tutorials/import-model.md'
                  />

        <div className="row">
          <div className="seven columns">
            <h2>Import Site & Zoning Assumptions</h2>
          </div>
          {/* <div className="seven columns">
            <input type="file" value="YourDefaultPathAndFilename.AndExtension">Sites CSV</input>
            <input type="file" value="YourDefaultPathAndFilename.AndExtension">Zoning CSV</input>
          </div> */}
          <div className="five columns u-pull-right">
            <p>In order to understand the zoning assumptions and site designations for your study area, you'll need to codify this in a spreadsheet format and import it into the tool. (See Tutorial writeup on "What You Need")</p>
            <p>Once you have the <code>sites.csv</code> and <code>zoning.csv</code> files prepared, use the <code>ImportSiteAssumptions</code> and <code>ImportZoningAssumptions</code> commands to import them into your model.</p>
            {/* If you are modifying an existing study with new site assumptions or zoning assumptions, run the `UpdateZoningAssumptions` or `UpdateSiteAssumptions` commands directly in Rhino. These will intelligently override any new information in the spreadsheet and leave any unchanged sites or zoning districts unchanged in the model. */}
            {/* <button>Import</button> */}
          </div>
        </div>

        <div className="row">
          <div className="twelve column">
            <h2>Model Sites</h2>
          </div>
        </div>
        <div className="row">
          <div className="seven columns">
            <CurrentSiteScenario 
              scenarios={this.state.scenarios} 
              sites={this.state.sites}
              onSubmitMessage={messageJSON => this.submitMessage("setCurrentSiteScenario", messageJSON)}
            />
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
            <h2>Summary</h2>
          </div>
          <div className="twelve columns">
            <SiteTable site={this.state.currentSite} />
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

      </div>
    );
  }

}

export default App;
