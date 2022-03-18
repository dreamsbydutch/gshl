import React from 'react'
import './StandingsItem.css'

function StandingsItem(props) {
  return (
    <>
      <div className={"stdg-team-container " + props.data.conf}>
        <div className="stdg-team-rank">{props.rank+1}</div>
        <div className="stdg-team-logo"><img src={props.data.logoURL} alt="Team Logo" /></div>
        <div className="stdg-team-name">{props.data.teamName}</div>
        <div className="stdg-team-record">{props.data.W} - {props.data.L}</div>
        <div className="stdg-team-categories">{props.data.CF} / {props.data.CA}</div>
      </div>
    </>
  )
}

export default StandingsItem