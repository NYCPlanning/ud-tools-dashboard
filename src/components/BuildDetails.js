import React from 'react';

export default function BuildDetails({version, buildDate}) {
  if (!version || !buildDate) return null

  const todaysDate = () => {
    const now = new Date();
    const date = now.toDateString();
    return date;
  }

  const shortVersion = version.split('.').slice(0,2).join('.')

  return (
    <div className="fixed bottom-0 left-0 w-full bg-blue-100">
      <div className='flex max-w-screen-sm justify-between p-4 '>
        <a href={`mailto:crodin@planning.nyc.gov?subject=UDTools Issue Report, ${todaysDate()} &body=Version: ${version}, Build Date: ${buildDate}%0D%0A%0D%0A[thanks for reporting an issue with UDTools! please replace this text with a detailed description of your issue, include screenshots if possible]`}>Report a Problem</a>
        { shortVersion && 
          <div className='text-blue-300 mr-2'>UDTools {shortVersion}</div>
        }
      </div>
    </div>
  )
}
