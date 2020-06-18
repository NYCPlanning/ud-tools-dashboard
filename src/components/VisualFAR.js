import React, { useRef, useEffect, useState } from 'react';
import { formatFAR } from '../utils/format';
import { select } from 'd3';

export default function VisualFAR({ pluginState }) {
  const [data, setData] = useState([25, 30, 45, 60, 20]);
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
      .attr("r", value => value)
      .attr("cx", value => value * 2)
      .attr("cy", value => value * 2)
      .attr("stroke", "red");
  }, [data]);

  return (
    <React.Fragment>
      <svg ref={svgRef}></svg>
    </React.Fragment>
  )
};
