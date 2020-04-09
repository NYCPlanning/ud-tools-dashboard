import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CurrentSiteScenario extends Component {
    constructor(props){
        super();
        this.state = {
            scenario: "None", // default to first in list
            site: "0"
        };
    }

    static propTypes = {
        onSubmitMessage: PropTypes.func.isRequired
    }

    handleChange(e){
        const key = e.target.id;
        const value = e.target.value;
        
        // sets state on this component
        this.setState({
           [key]: value
        })
    }

    componentDidUpdate() {
        // uses passed-down onSubmitMessage function
        // should be the websocket submitMessage
        // to send updated state to the server
        const messageBody = {
            site: this.state.site,
            scenario: this.state.scenario
        }
        
        this.props.onSubmitMessage(JSON.stringify(messageBody));
    }

    render() {
        return (
        <div>
            <label htmlFor="scenario">Scenario</label>
            <select id="scenario" onChange={this.handleChange.bind(this)} value={this.state.scenario}>
                {this.props.scenarios.map((x,y) => <option key={y}>{x}</option>)}
            </select>
            <label htmlFor="site">Site</label>
            <select id="site" onChange={this.handleChange.bind(this)} value={this.state.site}>
                {this.props.sites.map((x,y) => <option key={y}>{x}</option>)}
            </select>
        </div>
        );
    }
}

export default CurrentSiteScenario;
