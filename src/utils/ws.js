// url for the websockets service

export class WsProvider {
  constructor(app, url) {
    this.url = url;
    this.socket = new WebSocket(url);
    this.app = app;
    this.initialize()
  }

  initialize = () => {
    this.socket.onopen = () => {
      this.setConnected(true);
    }

    this.socket.onmessage = evt => {
      let message = JSON.parse(evt.data);
      message.body = JSON.parse(message.body);
  
      if (message.action === 'updatePluginState') {
        this.app.setState({'plugin': message.body});
        localStorage.setItem('plugin', JSON.stringify(message.body));
      }
    }

    this.socket.onclose = () => {
      this.setConnected(false);
      this.socket = new WebSocket(this.url);
    }
  
    this.socket.onerror = () => {
      this.setConnected(false);
    }
  }

  send = json => 
    this.socket.send(json)

  submitMessage = (action, messageString) => {
    const message = { action: action, body: messageString }
    this.send(JSON.stringify(message))
  }

  setConnected = c => 
    this.app.setState(state => ({ connected: c}))

  setScenario = id => 
    this.submitMessage('setScenario', id)

  setSite = id => 
    this.submitMessage('setSite', id)
}



