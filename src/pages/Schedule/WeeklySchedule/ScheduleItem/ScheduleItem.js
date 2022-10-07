import React, { useState } from 'react'
// import MatchupStats from './MatchupStats/MatchupStats'
import './ScheduleItem.css'

function ScheduleItem(props) {
  const [showInfo, setShowInfo] = useState(false)
  return (
    <div className='matchup-container' onClick={() => setShowInfo(!showInfo)}>
      <div className={'teaminfo ' + props.data.HomeWL}>
        <div className='teamlogo'><img src={props.data.AwayTeamData.LogoURL} alt='Away Team Logo' /></div>
        <div className={'teamname ' + props.data.AwayTeamData.Conference + ' ' + props.data.AwayWL}>{props.data.AwayTeamData.TeamName}</div>
      </div>
      <div className='matchup-score'>{props.data.HomeScore || props.data.AwayScore ? props.data.AwayScore + ' - ' + props.data.HomeScore : '@'}</div>
      <div className={'teaminfo ' + props.data.HomeWL}>
        <div className='teamlogo'><img src={props.data.HomeTeamData.LogoURL} alt='Home Team Logo' /></div>
        <div className={'teamname ' + props.data.HomeTeamData.Conference + ' ' + props.data.HomeWL}>{props.data.HomeTeamData.TeamName}</div>
      </div>
      <div className='matchup-stats' style={showInfo ? { display: 'block' } : { display: 'none' }}>
        {/* <MatchupStats data={props.data} /> */}
      </div>
    </div>
  )
}

export default ScheduleItem