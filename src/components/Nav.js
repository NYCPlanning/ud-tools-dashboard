import React from 'react'
import Status from './Status'

export default function Nav({connected, version, buildDate}) {
  const todaysDate = () => {
    const now = new Date();
    const date = now.toDateString();
    return date;
  }

  return (
    <div className="col-span-1">
      <h1 className="w-limit mb-4">UDTools Dashboard</h1>
      <div className="flex flex-col items-start">
        <Status connected={connected} />
        <div className='cursor-pointer font-bold text-blue-700 underline'>
          <a href={`mailto:crodin@planning.nyc.gov?subject=UDTools Issue Report, ${todaysDate()} &body=Version: ${version}, Build Date: ${buildDate}%0D%0A%0D%0A[thanks for reporting an issue with UDTools! please replace this text with a detailed description of your issue, include screenshots if possible]`}>Report a Problem</a>
        </div>
        <div className='text-gray-500'>{version}, {buildDate}</div>
      </div>
      <style>{`
        .w-limit {
          max-width: 12rem;
        }
      `}</style>
    </div>
  )
}
