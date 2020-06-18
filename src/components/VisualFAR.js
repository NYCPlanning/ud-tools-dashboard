import React, { useRef, useEffect, useState } from 'react';
import { formatFAR } from '../utils/format';
import { select } from 'd3';

export default function VisualFAR({ data, color }) {
  // const data = [2.5, 10.0]
  // const [data, setData] = useState([25, 30, 45, 60, 20]);
  // const zoningLotArea = pluginState.SiteCurrent.ZoningLotArea;
  // const zoning = pluginState.SiteCurrent.Scenarios[pluginState.ScenarioCurrent.Name];
  // const site = pluginState.SiteCurrent;
  // const maxFAR = Math.max(zoning.ResidentialFAR, zoning.CommunityFacilityFAR, zoning.CommercialFAR, zoning.ManufacturingFAR);
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('r', value => value)
      .attr('fill', (d, i) => i > 0 ? 'none' : color)
      .attr('stroke', (d, i) => i > 0 ? '#e0e0e0' : 'none')
      .attr('stroke-width', (d, i) => i > 0 ? '1' : 'none');
    }, [data]);

  return (
    <React.Fragment>
      <div className='flex flex-col justify-center items-center'>
        <svg viewBox='-14 -14 28 28' className='w-12 h-12' ref={svgRef}></svg>
        <span className={data[0] > data[1] ? 'text-red-500 font-bold' : ''}>
          {formatFAR(data[0])} of {formatFAR(data[1])}
        </span>        
      </div>
    </React.Fragment>
  )
};
