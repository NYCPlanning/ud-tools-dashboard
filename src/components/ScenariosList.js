import React from 'react'

export default function ScenariosList({ scenarios, setScenario, current }) {
  return (
    <div className='flex flex-wrap'>
      <h3 className='m-2 ml-0'>Scenarios:</h3>
      {scenarios &&
        scenarios.map((scenario) =>
          <div key={scenario.Name} onClick={() => setScenario(scenario.Name)} className={`cursor-pointer p-1 py-0 m-2 ${ current && scenario.Name === current.Name ? 'bg-black text-white' : 'bg-gray-200' }`} >
            {scenario.Name}
          </div>
        )
      }
    </div>
  )
}
