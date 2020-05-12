import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CurrentSiteScenario extends Component {
    constructor(props){
        super();
        this.state = {
            scenario: '', // default to first in list
            site: ''
        };
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        onSubmitMessage: PropTypes.func.isRequired
    }

    // handleChange(e){
    //     const key = e.target.id;
    //     const value = e.target.value;
    //     console.log(key, value)
    //     // sets state on this component
    //     this.setState({
    //        [key]: value
    //     })
    // }

    componentDidUpdate() {
        // uses passed-down onSubmitMessage function
        // should be the websocket submitMessage
        // to send updated state to the server
        console.log("triggeredDidUpdate")
        const messageBody = {
            site: this.state.site,
            scenario: this.state.scenario
        }
        
        this.props.onSubmitMessage(JSON.stringify(messageBody));
    }

    render() {
        const scenarios = this.props.scenarios.map((x,y) => <option key={y} value={x}>{x}</option>)
        const sites = this.props.sites.map((x,y) => <option key={y} value={x}>{x}</option>)

        return (
        <div>
            <select id="scenario" onChange={e => this.setState({scenario: e.target.value})} value={this.state.scenario}>
                <option>Select Scenario...</option>
                {scenarios}
            </select>
            <select id="site" onChange={e => this.setState({site: e.target.value})} value={this.state.site}>
                <option>Select Site...</option>
                {sites}
            </select>
        </div>
        );
    }
}

export default CurrentSiteScenario;
