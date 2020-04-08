import React, { Component } from 'react';
import './App.css';
import MapPanel from './components/MapPanel';
import CurrentSiteScenario from './components/CurrentSiteScenario';

// url for the websockets service
const URL = 'ws://localhost:4649/Dashboard'

class App extends Component {
  constructor(props){
    super();
    this.state = {
      status: false,
      scenarios: [],
      sites: [],
      currentscenario: "None",
      currentsite: "0",
      message: {}
      //messages: []
    };
  };


  // websockets

  ws = new WebSocket(URL)

  componentDidMount() {
    this.ws.onopen = () => {
      //this.addMessage("Connected...")
      console.log("connected")
      this.setStatus(true);
    }

    this.ws.onmessage = evt => {
      let message = JSON.parse(evt.data);
      message.body = JSON.parse(message.body);
      this.setState(state => ({message: message}));
      console.log(message);
      // then do different things to handle input message

      if (message.action == "updateSiteScenarioList") {
        this.setState(message.body);
      }
      //const message = evt.data
      //this.addMessage(message)
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      this.setStatus(false);

      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }

    this.ws.onerror = () => {
      console.log("error");
      this.setStatus(false);
    }
  }

  setStatus = status => 
    this.setState(state => ({ status: status}))

  // addMessage = message =>
  //   this.setState(state => ({ messages: [message, ...state.messages] }))

  submitMessage = (action, messageString) => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { action: action, body: messageString }
    //const message = messageString
    this.ws.send(JSON.stringify(message))
    //this.addMessage(message)
  }

  render() {
    return (
      <div className="App container">
        {/* <div className="row">
          <div className="twelve column">
            <h1>UD Tools</h1>
          </div>
        </div> */}

        <div className="row">
          <div className="seven columns">
            <h2>Start the Plugin</h2>
          </div>
          <div className="five columns u-pull-right">
            <p>After opening a new empty document in Rhino, launch the Dashboard with the <code>LaunchDashboard</code> command. The dashboard provides basic controls for the plugin alongside instructions and a live view of the underlying data.</p>
          </div>
        </div>
        

        <div className="row">
          <div className="twelve column">
            <h2>Import Context</h2>
          </div>
        </div>
        <div className="row">
          <div className="seven columns">
            <MapPanel 
              ws={this.ws}
              onSubmitMessage={messageString => this.submitMessage("setSiteBounds", messageString)}
            />
            <div id="info">
              <span id="status">◼︎</span>
              <span id="message">STATUS</span>
            </div>
          </div>
          <div className="five columns">
            <p>First create a set of empty layers for your new model using the "Populate Layers" button below. You can run the Rhino Command <code>CheckLayers</code> to check that your model layers are set up correctly. If your model is missing expected layers, it will repopulate the Layer table for you.</p>
            <p>Next, using the map in the Dashboard, use your cursor to draw a polygon around your site boundary. This area can be a single building, a block or a whole neighborhood – just be aware a larger area will take longer to import than something small. Click points until you have an outline, then click the beginning of the line to complete. This will create a project boundary in the Rhino model.</p>
            <p>In Rhino, you can now run the command <code>ImportModel</code>. You may need to wait a few seconds, but when it's completed you should see a full 3D site model and several 2D map layers appear in the Rhino window.</p>
            <button onClick={() => { this.submitMessage("ImportModel", "Empty") }}>Import Model</button>
          </div>
        </div>

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
            <table>
              <tr>
                <th>Site ID</th>
                <th>Total GFA</th>
                <th>Total FAR</th>
                <th>Allowed FAR</th>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
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
