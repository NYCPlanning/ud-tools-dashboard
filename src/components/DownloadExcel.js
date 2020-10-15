import React from 'react';
import RWCDSWorkbook from '../utils/table_io';

export default function DownloadExcel({state}) {
  if (!state.LotTable || !state.Sites) return <div />
  const xl = new RWCDSWorkbook(state);

  const downloadExcel = (e) => {
    xl.download();
  };

  return (
    <div className='flex'>
      <div className='bg-blue-500 p-2' onClick={(e) => downloadExcel(e)}></div>
    </div>
  )
};
