import React from 'react'
import './RankingItem.css'

function RankingItem(props) {
  return (
    <div className="team-ranking-listing">
        <div className="teamName">{props.data.teamData.teamName}</div>
        <div className="teamStats">
            <div className="teamRecord">{props.data.teamData.W+" - "+props.data.teamData.L}</div>
            <div className="teamConfRecord">{"("+props.data.teamData.CCW+" - "+props.data.teamData.CCL+")"}</div>
            <div className="teamLastWeek">{props.data.teamData.teamID === props.data.lastWeekData.HomeTeam ? props.data.lastWeekData.HomeWL+" "+props.data.lastWeekData.HomeScore+"-"+props.data.lastWeekData.AwayScore+" v "+props.data.lastWeekData.AwayTeamData.TeamName : props.data.lastWeekData.AwayWL+" "+props.data.lastWeekData.AwayScore+"-"+props.data.lastWeekData.HomeScore+" @ "+props.data.lastWeekData.HomeTeamData.TeamName}</div>
        </div>
    </div>
  )
}

export default RankingItem
