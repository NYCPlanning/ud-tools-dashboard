import React from 'react';

export function Dropdown({ label, list, current, set }) {
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

export function ToggleList({ label, list, current, set }) {
  if (!list || list.length === 0 ) return <div>No {label} loaded.</div>
  const itemCurrent = list[current]

  return (
    <div className='flex flex-wrap items-baseline mb-4'>
      <span className='m-2 ml-0 font-bold'>{label}</span>
      {list &&
          list.map((item, i) =>
            <div 
              key={item.ID || item.Name} 
              onClick={() => set(item.ID)} 
              className={`p-2 py-1 mr-2 ${ item.ID === itemCurrent.ID ? 'button-active' : 'button' }`}
            >
              {item.ID || item.Name}
            </div>
          )
      }
    </div>
  )
}
