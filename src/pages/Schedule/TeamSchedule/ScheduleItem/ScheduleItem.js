import React from 'react'
import { Link } from 'react-router-dom'
import './ScheduleItem.css'

function ScheduleItem(props) {
  var opponent = props.data.AwayTeamData.id === props.teamID ? props.data.HomeTeamData : props.data.AwayTeamData
  return (
    <Link to={"/matchup/"+props.data.id}>
    <div className={props.data.GameType === "CC" || props.data.GameType === "NC" || props.data.GameType === "RS" ? 'team-schedule-item ' + opponent.Conference : 'team-schedule-item ' + props.data.GameType}>
      <div className={'week'}>
        {props.data.GameType === "CC" || props.data.GameType === "NC" || props.data.GameType === "RS" ? props.data.WeekNum : props.data.GameType}
      </div>
      <div className={'opponent'}>
        {props.data.AwayTeamData.id === props.teamID ? '@ ' + opponent.TeamName : 'v ' + opponent.TeamName}
      </div>
      <div className={props.data.HomeTeamData.id === props.teamID ? 'score ' + props.data.HomeWL : 'score ' + props.data.AwayWL}>
        <div className="winloss">{props.data.HomeTeamData.id === props.teamID ? props.data.HomeWL : props.data.AwayWL}</div>
        <div className="score">{props.data.HomeTeamData.id === props.teamID ? props.data.HomeScore + ' - ' + props.data.AwayScore : props.data.HomeScore + ' - ' + props.data.AwayScore}</div>
      </div>
    </div>
    </Link>
  )
}

export default ScheduleItem