import React from 'react'

export class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const setter = this.props.set;
    setter(e.target.value);
  }

  render() {
    const {label, list, current} = this.props;
    if (!list) return <div>No {label} defined...</div>
    return (
      <div>
        <label>{label}:</label>
        <select value={list[current]} onChange={this.handleChange}>
          {list.map((item, i) => (
            <option key={i} value={item.ID || item.Name}>{item.ID || item.Name}</option>
          ))}
        </select>
      </div>
    )
  }
}
