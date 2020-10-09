import React from 'react'
//setScenario, current, sites, setSite, current 
export default function GraphicSiteScenario({ scenarios, sites, scenarioCurrent, siteCurrent }) {
  if (!scenarios || !sites) return (<span>loading...</span>) 

  const scenarioRows = scenarios.map((scenario) => (
    <div>{scenario.Name}</div>
  ))

  const siteColumns = sites.map((site, i) => (
    <div>
      <div>{site.ID}</div>
      {/* {site.Scenarios.map((scn) => (
        <div>scn</div>
      ))} */}
    </div>
  ));


  const position = [scenarioCurrent, siteCurrent]
  const grid = scenarios.map((scenario, i) => (
    sites.map((site, j) => (
      <div id={`g-{i}-{j}`} className={'bg-black text-white m-2 px-2 p-1'}>•</div>
    ))
  ));

  return (
    <div className='flex flex-wrap'>
      {grid}
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
