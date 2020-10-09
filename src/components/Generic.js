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
  if (!list || list.length === 0) return <div>No {label} loaded.</div>
  const itemCurrent = list[current]
  return (
    <div className='flex flex-wrap mb-4'>
      <h3 className='m-2 ml-0'>{label}:</h3>
      {list &&
          list.map((item, i) =>
            <div 
              key={item.ID || item.Name} 
              onClick={() => set(item.ID)} 
              className={`cursor-pointer text-xs p-2 py-1 m-2 ${ item.ID === itemCurrent.ID ? 'bg-black text-white' : 'bg-gray-200' }`}
            >
              {item.ID || item.Name}
            </div>
          )
      }
    </div>
  )
}
