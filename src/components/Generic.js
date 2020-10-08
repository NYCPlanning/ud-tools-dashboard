import React, { useState, useEffect } from 'react'

export function Dropdown({ label, list, current, set }) {
  const initialValue = (list[current] && list[current].ID) || null
  const [value, setValue] = React.useState();

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
  if (!list) return <div>No {label} defined...</div>
  const itemCurrent = list[current]
  return (
    <div className='flex flex-wrap'>
      <h3 className='m-2 ml-0'>{label}:</h3>
      {list &&
          list.map((item, i) =>
            <div 
              key={item.ID || item.Name} 
              onClick={() => set(item.ID)} 
              className={`cursor-pointer p-1 py-0 m-2 ${ item.ID === itemCurrent.ID ? 'bg-black text-white' : 'bg-gray-200' }`}
            >
              {item.ID || item.Name}
            </div>
          )
      }
    </div>
  )
}
