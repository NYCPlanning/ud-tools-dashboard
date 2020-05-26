import React from 'react'

export default function ScenariosList({ scenarios, setScenario, current }) {
  const listItems = scenarios.map((scenario, i) =>
    <div 
      key={scenario} 
      className={`cursor-pointer p-1 py-0 m-2 ${ i === current ? 'bg-black text-white' : 'bg-gray-200' }`} 
      onClick={() => setScenario(i)}
    >
      {scenario}
    </div>
  )
  return (
    <div className='flex'>
      <h3 className='m-2 ml-0'>Scenarios:</h3>
      {listItems}
    </div>
  )
}
