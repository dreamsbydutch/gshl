// import React, { useEffect, useState } from 'react'
// import { useFetchStandings } from '../../hooks/standings'
// import StandingsItem from './StandingsItem/StandingsItem'
// import ErrorPage from '../../pages/ErrorPage/ErrorPage'
// import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

function StandingsContainer(props) {
  // const [standingsData, setStandingsData] = useState(null)
  // const { data, error, loading } = useFetchStandings()

  // useEffect(() => {
  //   if (!data) { setStandingsData(null) }
  //   else if (props.type === "SV") {
  //     setStandingsData(getConferenceStandings(data, props.type))
  //   } else if (props.type === "HH") {
  //     setStandingsData(getConferenceStandings(data, props.type))
  //   } else if (props.type === "OVR") {
  //     setStandingsData(getOverallStandings(data))
  //   } else if (props.type === "WC") {
  //     setStandingsData(getWildcardStandings(data))
  //   }
  // }, [props.type, data])
  
  // if (loading) { return <LoadingSpinner /> }
  // if (error) { return <ErrorPage /> }
  // return (
  //   <>
  //   {data && standingsData.map((team,i) =>
  //     <StandingsItem data={team} rank={i} key={team.teamID}/>
  //   )}
  //   </>
  // )
}

export default StandingsContainer


// function getConferenceStandings(data, conference) {
//   const temp = data.filter(x => x.conf === conference)
//   temp.map(team => {
//     return [team.teamID,team.W,team.L,team.CF,team.CA,team.Diff,team.confW,team.confL,team.confCF,team.confCA,team.confDiff]
//   })
//   return temp
// }
// function getWildcardStandings(data) {
//   const temp = data.sort((a,b) => b.confW-a.confW).sort((a,b) => b.CF-a.CF).sort((a,b) => b.W-a.W)
//   return temp
// }
// function getOverallStandings(data) {
//   const temp = data.sort((a,b) => b.confW-a.confW).sort((a,b) => b.CF-a.CF).sort((a,b) => b.W-a.W)
//   return temp
// }