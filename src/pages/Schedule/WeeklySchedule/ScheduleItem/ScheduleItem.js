import React from 'react'
// import { Link } from 'react-router-dom'
import './ScheduleItem.css'

function ScheduleItem(props) {
  return (
    // <Link className='matchup-container' to={"/matchup/"+props.data.id}>
    <div className="matchup-container">
      <div className={'teaminfo ' + props.data.HomeWL}>
        <div className='teamlogo'><img src={props.data.AwayTeamData.LogoURL} alt='Away Team Logo' /></div>
        <div className={'teamname ' + props.data.AwayTeamData.Conference + ' ' + props.data.AwayWL}>{props.data.AwayTeamData.TeamName}</div>
      </div>
      <div className='matchup-score'>{props.data.HomeScore || props.data.AwayScore ? props.data.AwayScore + ' - ' + props.data.HomeScore : '@'}</div>
      <div className={'teaminfo ' + props.data.HomeWL}>
        <div className='teamlogo'><img src={props.data.HomeTeamData.LogoURL} alt='Home Team Logo' /></div>
        <div className={'teamname ' + props.data.HomeTeamData.Conference + ' ' + props.data.HomeWL}>{props.data.HomeTeamData.TeamName}</div>
      </div>
    </div>
    // </Link>
  )
}

export default ScheduleItem