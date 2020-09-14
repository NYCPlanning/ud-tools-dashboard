import React from 'react';

class MassingGoals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      floorHts: [],
      useGroups: [],
    }
    this.ws = props.ws;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const values = e.target.value.split(',').map((el) => el.trim())
    const key = e.target.name;
    this.setState({ [key]: values})
  }

  handleSubmit(e) {
    console.log('submitted')
  }

  render() {
    return (
      <div className='flex flex-col'>
        <form onSubmit={this.handleSubmit}>
          <label>
            Floor Heights: 
            <input type='text'
                   name='floorHts'
                   value={this.state.floorHts.join(',')}
                   onChange={this.handleChange} />
          </label>
          <label>
            Floor Use Groups: 
            <input type='text'
                   name='useGroups' 
                   value={this.state.useGroups.join(',')}
                   onChange={this.handleChange} />
          </label>
          <input type='submit' value='Submit' />
        </form>
      </div>
    )
  }
}

export default MassingGoals;