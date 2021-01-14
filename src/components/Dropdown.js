import React from 'react';

export default function Dropdown({ label, list, current, set }) {
  const [value] = React.useState();

  return (
    <div>
      <label>{label}:</label>
      <select value={value} onChange={(e) => set(e.target.value)}>
        {list.map((item, i) => (
          <option key={i} value={item.ID || item.Name}>{item.ID || item.Name}</option>
        ))}
      </select>
    </div>
  )
}

