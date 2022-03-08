import React from 'react'
import './StandingsItem.css'

function StandingsItem(props) {

  return (
    <>
      <div className={`stdg-item-container ${props.team.Conf}`}>
        <div className="stdg-teamName">{props.team.teamName}</div>
        <div className="stdg-teamRecord">{props.team.W} - {props.team.L}</div>
        <div className="stdg-teamCF">{props.team.CF}</div>
        <div className="stdg-teamCA">{props.team.CA}</div>
        <div className="stdg-teamDiff">{props.team.Diff}</div>
      </div>
    </>
  )
}

export default StandingsItem