import React from 'react'
import { categories } from '../../../../../utils/constants'
import './MatchupStats.css'

function MatchupStats(props) {
  return (
    <>
      {categories['2022'].map(obj => {
        var home = props.data.HomeTeamStats[obj.id] && +props.data.HomeTeamStats[obj.id]
        var away = props.data.AwayTeamStats[obj.id] && +props.data.AwayTeamStats[obj.id]
        var winner = [
          (home > away || away === '') ? "win" : (home < away || home === '') ? "loss" : "tie",
          (away > home || home === '') ? "win" : (away < home || away === '') ? "loss" : "tie"
        ]
        if (obj.content === "GAA" && away !== '' && home !== '') { winner = [winner[1],winner[0]] }
        return (
          <div className="stat-row" key={obj.id}>
            <div className={['team-stat',winner[1]].join(" ")}>{away}</div>
            <div className="stat-label">{obj.content}</div>
            <div className={['team-stat',winner[0]].join(" ")}>{home}</div>
          </div>
        )
      })}
    </>
  )
}

export default MatchupStats