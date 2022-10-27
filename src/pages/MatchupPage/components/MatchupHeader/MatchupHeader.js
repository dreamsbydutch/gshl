import React from 'react'
import './MatchupHeader.css'

function MatchupHeader(props) {
  if (!props.matchupData.HomeTeamData || !props.matchupData.AwayTeamData) {return <></>}
  return (
    <div className="matchuppage-matchupheader">
      <div className="teamheader">
        <img src={props.matchupData.AwayTeamData.LogoURL} alt={props.matchupData.AwayTeamData.TeamName+"Logo"}/>
        <div className={"teamscore "+props.matchupData.AwayWL}>{props.matchupData.AwayScore}</div>
      </div>
      <div className="symbol">@</div>
      <div className="teamheader">
        <div className={"teamscore "+props.matchupData.HomeWL}>{props.matchupData.HomeScore}</div>
        <img src={props.matchupData.HomeTeamData.LogoURL} alt={props.matchupData.HomeTeamData.TeamName+"Logo"}/>
      </div>
    </div>
  )
}

export default MatchupHeader