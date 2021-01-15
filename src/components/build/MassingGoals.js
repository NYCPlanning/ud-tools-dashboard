import React, { useEffect, useState } from 'react';
import _ from 'lodash';

const useCategories = {
  'Residential': [2, 1],
  'Community Facility': [3, 4],
  'Commercial': _.range(5, 16),
  'Manufacturing': [16, 17, 18]
}

const FloorForm = ({ goals, handleSubmit }) => {
  const [category, setCategory] = useState('Residential')
  const [height, setHeight] = useState('10')
  const [group, setGroup] = useState('2')

  useEffect(() => {
    // adjust default floor height based on number of defined floors
    if (goals.length < 1) setHeight(15)
    else setHeight(10)
  })

  const addFloor = (e) => {
    e.preventDefault();
    handleSubmit({
      'height': height,
      'category': category,
      'group': group
    })
  }

  const useCategoryOptions = Object.keys(useCategories).map((k, i) => (
    <option key={`cat_${i}`} disabled={null} name={k}>{k}</option>
  ))

  const useGroupOptions = useCategories[category].map((g, i) => (
    <option key={`g_${i}`} name={g}>{g}</option>
  ))

  return (
    <form className={'flex align-baseline justify-between mb-4'}>
      <label>
        Height
        <input 
          className='ml-2 w-8' 
          type='text' 
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </label>
      <label>
        Use Category
        <select 
          className='ml-2'
          value={category}
          onChange={(e) => {
            setCategory(e.target.value); 
            setGroup(useCategories[e.target.value][0]);
          }}
        >
          {useCategoryOptions}
        </select>
      </label>
      <label>
        Use Group
        <select 
          className='ml-2 mr-4' 
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        >
          {useGroupOptions}
        </select>
      </label>
      <button onClick={addFloor}>Add Floor</button>
    </form>
  )
}

export default ({plugin, ws}) => {
  const [goals, setGoals] = useState([])

  const addGoal = (goal) => {
    const floorLabel = (goals.length < 1) ? 'G' : goals.length + 1
    setGoals(goals => [{'label': floorLabel, ...goal}, ...goals])
  }

  const handleClick = () => {
    addGoal()
  }

  const submitGoals = () => {
    let floorHts = []
    let useGroups = []

    goals.reverse().forEach((g) => {
      floorHts.push(Number(g.height))
      useGroups.push(Number(g.group))
    })

    ws.submitMessage('setMassingGoals', {
      'floorHts': floorHts,
      'useGroups': useGroups
    });

    setGoals([])
  }

  const goalRows = goals.map((g, i) => (
    <tr key={`floortable_${i}`}>
      <td className='mr-2'>{g.label}</td>
      <td className='mr-2'>{g.height}</td>
      <td className='mr-2'>{g.category}</td>
      <td className='mr-2'>{g.group}</td>
    </tr>
  ))

  return (
    <div className='flex flex-col mb-4'>
      <h3>Massing Goals</h3>
      <table className='w-48 mb-4'>
        <tbody>
          {goalRows}
        </tbody>
      </table>
      <br/>
      <FloorForm handleSubmit={addGoal} goals={goals} />
      <button className='self-end' onClick={submitGoals}>Set Massing Goals</button>
    </div>
  )
}
