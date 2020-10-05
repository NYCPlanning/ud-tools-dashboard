import React from 'react'
//setScenario, current, sites, setSite, current 
export default function GraphicSiteScenario({ scenarios, sites}) {
  const siteColumns = () => {
    const columns = scenarios.map((scenario) => {
      
    })
  }

  return (
    <div className='flex flex-wrap'>
      SITESCENARIO
      {/* <h3 className='m-2 ml-0'>Scenario:</h3>
      {scenarios &&
        scenarios.map((scenario) =>
          <div key={scenario.Name} onClick={() => setScenario(scenario.Name)} className={`cursor-pointer p-1 py-0 m-2 ${ current && scenario.Name === current.Name ? 'bg-black text-white' : 'bg-gray-200' }`} >
            {scenario.Name}
          </div>
        )
      } */}
    </div>
  )
}

// export default function SitesList({ sites, setSite, current }) {
//   return (
//     <div className='flex flex-wrap'>
//       <h3 className='m-2 ml-0'>Site:</h3>
//       {sites &&
//           sites.map((site, i) =>
//             <div key={site.ID} onClick={() => setSite(site.ID)} className={`cursor-pointer p-1 py-0 m-2 ${ current && site.ID === current.ID ? 'bg-black text-white' : 'bg-gray-200' }`}>
//               {site.ID}
//             </div>
//           )
//       }
//     </div>
//   )
// }
