import React, { Component } from 'react';
import './App.css';
import MapPanel from './components/MapPanel.js';

// url for the websockets service
const URL = 'ws://localhost:4649/Echo'

class App extends Component {

  state = {
    status: false,
    messages: []
  }

  ws = new WebSocket(URL)

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
      this.addMessage("Connected...")
      this.changeStatus(true);
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      //const message = JSON.parse(evt.data)
      const message = evt.data
      this.addMessage(message)
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.changeStatus(false);
      this.setState({
        ws: new WebSocket(URL),
      })
    }

    this.ws.onerror = () => {
      console.log("No connection...");
      this.changeStatus(false);
    }
  }

  changeStatus = status => 
    this.setState(state => ({ status: status}))

  addMessage = message =>
    this.setState(state => ({ messages: [message, ...state.messages] }))

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    //const message = { name: this.state.name, message: messageString }
    const message = messageString
    this.ws.send(message)
    this.addMessage(message)
  }

  render() {
    return (
      <div className="App container">
        <div className="row">
          <div className="twelve column">
            <h1>UD Tools</h1>
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
              onSubmitMessage={messageString => this.submitMessage(messageString)}
            />
            <div id="info">
              <span id="status">◼︎</span>
              <span id="message">YO</span>
            </div>
          </div>
          <div className="five columns">
            <p>Are you starting a new model/project? If not, skip this section.</p>
            <p>Otherwise, first create a set of empty layers for your new model:</p>
            <button>Populate Layers</button>
            <p>Use your cursor to draw a polygon around your area of interest in this map. Click points until you have an outline, then click the beginning of the line to complete.</p>
            <p>Once you're done, run the command <code>ImportCarto</code> in Rhino and DCPTools will generate a site model.</p>
          </div>
        </div>

        <div className="row">
          <div className="twelve column">
            <h2>Import Site & Zoning Assumptions</h2>
          </div>
        </div>
        {/* <div className="row">
          <div className="seven columns">
            <input type="file" value="YourDefaultPathAndFilename.AndExtension">Sites CSV</input>
            <input type="file" value="YourDefaultPathAndFilename.AndExtension">Zoning CSV</input>
          </div>
          <div className="five columns u-pull-right">
            <p>Lorem ipsum...</p>
            <button>Import</button>
          </div>
        </div> */}

        <div className="row">
          <div className="twelve column">
            <h2>Import Context</h2>
          </div>
        </div>

        <div className="row">
          <div className="twelve columns">
            <h2>Model Sites</h2>
          </div>
        </div>

        <div className="row">
          <div className="twelve columns">
            <h2>Summary</h2>
          </div>
        </div>

        <div className="row">
          <div className="twelve columns">
            <h2>Export Data</h2>
          </div>
        </div>
        <div className="row">
          <div className="seven columns">
            <input type="file" />Template CSV
            <input type="file" />Export path
          </div>
          <div className="five columns u-pull-right">
            <p>Clicking "Export" below will use the template CSV provided to create an output CSV at the specified path for the current Scenario.</p>
            <button>Export</button>
          </div>
        </div>

        <div className="row">
          <div className="twelve column">
            <div id="footer"></div>
          </div>
        </div>

      </div>
    );
  }

}

export default App;
