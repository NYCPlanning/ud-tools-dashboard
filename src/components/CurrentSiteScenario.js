import React, { Component } from 'react';

class CurrentSiteScenario extends Component {
    constructor(props){
        super();
        this.state = {
            scenario: '',
            site: ''
        };
    }

//   state = {
//     status: false,
//     messages: []
//   }

    handleChange(e){
        const key = e.target.id;
        const value = e.target.value;

        this.setState({
           [key]: value
        })
    }

    render() {
        return (
        <div>
            <label for="scenario">Scenario</label>
            <select id="scenario" onChange={this.handleChange.bind(this)} value={this.state.scenario}>
                {this.props.scenarios.map((x,y) => <option key={y}>{x}</option>)}
            </select>
            <label for="site">Site</label>
            <select id="site" onChange={this.handleChange.bind(this)} value={this.state.site}>
                {this.props.sites.map((x,y) => <option key={y}>{x}</option>)}
            </select>
        </div>
        );
    }
}

export default CurrentSiteScenario;
