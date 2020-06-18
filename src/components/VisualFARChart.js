import React, { useRef, useEffect, useState } from 'react';
import { formatFAR } from '../utils/format';
import { select } from 'd3';
import VisualFAR from './VisualFAR';

export default function VisualFARChart({ pluginState }) {
  return (
    <div className='label flex justify-between'>
      <VisualFAR data={[2.5, 10]} color={'yellow'}/>
      <VisualFAR data={[5, 12]} color={'teal'}/>
      <VisualFAR data={[10, 3]} color={'red'}/>
      <VisualFAR data={[2.5, 3]} color={'purple'}/>
      <VisualFAR data={[10, 12]} color={'black'}/>
    </div>
  )
};
