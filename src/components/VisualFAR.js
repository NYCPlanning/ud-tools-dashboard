import React, { useRef, useEffect } from 'react';
import { select } from 'd3';

export default function VisualFAR({ data, color }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0 || isNaN(data[0])) return
    const svg = select(svgRef.current);
    svg
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('r', value => value * 10)
      .attr('fill', (d, i) => i > 0 ? 'none' : color)
      .attr('stroke', (d, i) => i > 0 ? '#e0e0e0' : 'none')
      .attr('stroke-width', (d, i) => i > 0 ? '1' : 'none');
    }, [data, color]);

  return (
    <React.Fragment>
      <div className='flex flex-col justify-center items-center'>
        <svg viewBox='-14 -14 28 28' className='w-12 h-12' ref={svgRef} />
      </div>
    </React.Fragment>
  )
};
