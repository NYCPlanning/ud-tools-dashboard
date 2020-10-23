import React from 'react';

const AddSubtractControls = () => (
  <div>
    <span className='bg-green-300 text-white rounded-full px-1 mr-1'>+</span>
    <span className='bg-red-300 text-white rounded-full px-1'>–</span>
  </div>
);

function FloorHeightPicker({heights}) {
  const elements = heights.reverse().map((e) => {
    return (
      <div className=' bg-black text-white p-2 m-1'>
        {e}
      </div>
    )
  });

  return (
    <div className='flex flex-col justify-end content-end'>
      <AddSubtractControls />
      {elements}
    </div>
  )
}

function FloorUsePicker({uses}) {
  const useElements = uses.reverse().map((u) => {
    return (
      <div className=' bg-black text-white p-2 m-1'>
        {u}, USE LABEL
      </div>
    )
  });

  return (
    <div className='flex flex-col justify-end content-end'>
      <AddSubtractControls />
      {useElements}
    </div>
  )
}

function FloorsUnderlayDrawing({colors, heights}) {
  return (
    <div className='flex flex-col content-end'>
      FLOORS UNDERLAY
    </div>
  )
}

class GraphicMassingGoals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      floorHts: [],
      useGroups: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const values = e.target.value.split(',').map((el) => el.trim())
    const key = e.target.name;
    this.setState({ [key]: values})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.ws.submitMessage('setMassingGoals', this.state);
  }

  render() {
    return (
      <div className='flex'>
        <FloorHeightPicker heights={[15.0,12.0]}/>
        <FloorUsePicker uses={[6,6,5]}/>
        {/* <FloorsUnderlayDrawing /> */}
      </div>
    )
  }
}

export default GraphicMassingGoals;