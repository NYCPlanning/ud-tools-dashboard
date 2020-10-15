import React from 'react';
import RWCDSWorkbook from '../utils/table_io';

export default function DownloadExcel({state, rwcds}) {
  if (!state.LotTable || !state.Sites || !rwcds) return <div />
  const xl = new RWCDSWorkbook(state, rwcds);
  
  const downloadExcel = (e) => {
    xl.download();
  };

  return (
    <div className='flex'>
      <div className='bg-blue-500 p-2' onClick={(e) => downloadExcel(e)}>Export Excel</div>
    </div>
  )
};
