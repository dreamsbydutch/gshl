import React from 'react'
import { useStandings } from '../../../utils/fetchData'
import StandingsItem from './StandingsItem/StandingsItem'
import LoadingSpinner from '../../../utils/LoadingSpinner/LoadingSpinner'
import './StandingsContainer.css'

function StandingsContainer(props) {
  const standingsData = useStandings()

  var standingsObj = {
    "SV": getConferenceStandings(standingsData.data.filter(obj => obj.Season === props.season), "SV"),
    "HH": getConferenceStandings(standingsData.data.filter(obj => obj.Season === props.season), "HH"),
    "OVR": getOverallStandings(standingsData.data.filter(obj => obj.Season === props.season)),
    "WC": getWildcardStandings(standingsData.data.filter(obj => obj.Season === props.season))
  }

  if(standingsData.isLoading) { return <LoadingSpinner />
}
return (
  <div className={'standings-container '+props.type} >
    {standingsObj && standingsObj[props.type].map((team, i) =>
      <StandingsItem data={team} rank={i} key={team.teamID} />
    )}
  </div>
)
}

export default StandingsContainer


function getConferenceStandings(data, conference) {
  const temp = data.filter(x => x.conf === conference)
  temp.map(team => {
    return [team.teamID, team.W, team.L, team.CF, team.CA, team.Diff, team.confW, team.confL, team.confCF, team.confCA, team.confDiff]
  })
  return temp.sort((a, b) => b.confW - a.confW).sort((a, b) => b.CF - a.CF).sort((a, b) => b.W - a.W)
}
function getWildcardStandings(data) {
  const temp = data.sort((a, b) => b.confW - a.confW).sort((a, b) => b.CF - a.CF).sort((a, b) => b.W - a.W)
  return temp
}
function getOverallStandings(data) {
  const temp = data.sort((a, b) => b.confW - a.confW).sort((a, b) => b.CF - a.CF).sort((a, b) => b.W - a.W)
  return temp
}