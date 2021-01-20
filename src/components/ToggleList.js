import React from 'react';

export default function ToggleList({ label, list, current, set, selectNone }) {
  let itemCurrent = 0

  const buttonStyle = (id) => {
    let buttonStyle = 'button'
    if (itemCurrent.ID === id && !selectNone) buttonStyle = 'button-active'
    return buttonStyle
  }
  if (list) itemCurrent = list[current]

  return (
    <div className='flex flex-wrap items-baseline mb-8'>
      <span className='m-2 ml-0 font-bold'>{label}</span>
      {list &&
          list.map((item, i) =>
            <div 
              key={item.ID || item.Name} 
              onClick={() => set(item.ID)} 
              className={`p-2 py-1 mr-2 ${buttonStyle(item.ID)}`}
            >
              {item.ID || item.Name}
            </div>
          )
      }
    </div>
  )
}
