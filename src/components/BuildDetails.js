import React from 'react'
import Status from './Status'

export default function BuildDetails({connected, version, buildDate}) {
  const todaysDate = () => {
    const now = new Date();
    const date = now.toDateString();
    return date;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full">
      <div className='flex justify-between p-4 bg-white'>
        <a href={`mailto:crodin@planning.nyc.gov?subject=UDTools Issue Report, ${todaysDate()} &body=Version: ${version}, Build Date: ${buildDate}%0D%0A%0D%0A[thanks for reporting an issue with UDTools! please replace this text with a detailed description of your issue, include screenshots if possible]`}>Report a Problem</a>
        { version && 
          <div className='text-gray-500'>UDTools {version}</div>
        }
      </div>
    </div>
  )
}
