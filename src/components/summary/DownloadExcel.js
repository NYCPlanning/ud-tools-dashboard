import React from 'react';
import RWCDSWorkbook from '../../utils/table_io';

export default function DownloadExcel({plugin, rwcds}) {
  if (!plugin.LotTable || !plugin.Sites || !rwcds) return <div />
  const xl = new RWCDSWorkbook(plugin, rwcds);
  
  const downloadExcel = (e) => {
    xl.download();
  };

  return (
    <div className='flex'>
      <button onClick={(e) => downloadExcel(e)}>Download Excel</button>
    </div>
  )
};
