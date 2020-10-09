import React from 'react';
import { formatNum, formatFAR } from '../utils/format';

class MassingGoals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      floorHts: [],
      useGroups: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const values = e.target.value.split(',').map((el) => el.trim())
    const key = e.target.name;
    this.setState({ [key]: values})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.ws.submitMessage('setMassingGoals', this.state);
  }

  render() {
    const useCategories = {
      0: 'Residential',
      1: 'Community Facility',
      2: 'Commercial',
      3: 'Manufacturing'
    }

    const plugin = this.props.plugin;
    if (plugin.Sites.length < 1) return <div>No sites loaded.</div>
    const site = plugin.Sites[plugin.SiteCurrent];
    const scenario = plugin.Scenarios[plugin.ScenarioCurrent];
    const zone = site.Scenarios[scenario.ID]
    const farAvailableList = Object.entries(zone).flatMap(([k,v])=> {
      return (v > 0 && k.includes('FAR')) ? `${k} of ${formatFAR(v)}` : []
    });
    const farAvailableString = farAvailableList.length > 0 ? farAvailableList.join(', ') : 'no FAR'

    const { FloorHeights: heights, FloorUses: uses } = plugin.MassingGoalsCurrent
    const flHtJoined = heights.map((h) => `${h}'`).join(', ')
    const flHtString = ` with floor heights of ${flHtJoined}`
    const useJoined = uses.map(({Category, Group, Label}) => {
      const checkLabel = Label == 'unknown' ? '' : Label
      return `${useCategories[Category]} (Group ${Group}${checkLabel})`
    }).join(', ')
    const useString = ` ${useJoined}`

    const goalsString = `Site ${site.ID} has ${farAvailableString} available. Current goals are to provide ${useString}, with ${flHtString}.`
    return (
      <div className='flex flex-col'>
        <h2>Massing Goals</h2>
        {goalsString}
        <form onSubmit={this.handleSubmit}>
          <label className='block'>
            Floor Heights: 
            <input type='text'
                   name='floorHts'
                   value={this.state.floorHts.join(',')}
                   onChange={this.handleChange} 
                   className={'border border-black'}
            />
          </label>
          <label className='block'>
            Floor Use Groups: 
            <input type='text'
                   name='useGroups' 
                   value={this.state.useGroups.join(',')}
                   onChange={this.handleChange} 
                   className={'border border-black'}
            />
          </label>
          <input type='submit' value='Set Massing Goals' />
        </form>
      </div>
    )
  }
}

export default MassingGoals;