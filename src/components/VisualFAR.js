import React, { useRef, useEffect, useState } from 'react';
import { select } from 'd3';
import { formatFAR } from '../utils/format';

export default function VisualFAR({ data, color }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('r', value => value * 10)
      .attr('fill', (d, i) => i > 0 ? 'none' : color)
      .attr('stroke', (d, i) => i > 0 ? '#e0e0e0' : 'none')
      .attr('stroke-width', (d, i) => i > 0 ? '1' : 'none');
    }, [data]);

  return (
    <React.Fragment>
      <div className='flex flex-col justify-center items-center'>
        {(data[1] != 0)
          ? <svg viewBox='-14 -14 28 28' className='w-12 h-12' ref={svgRef} />
          : <div className='w-12 h-12 text-gray-500 flex justify-center items-center'>X</div>
        }
      </div>
    </React.Fragment>
  )
};
