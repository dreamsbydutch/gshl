import React from 'react'
import { categories } from '../../../../utils/constants'
import './MatchupStats.css'

function MatchupStats(props) {
  if (!props.matchupData.HomeTeamStats || !props.matchupData.AwayTeamStats || !props.matchupData.HomePlayerStats || !props.matchupData.AwayPlayerStats) {return <></>}
  return (
    <div className="matchuppage-matchupstats">
    {categories[props.matchupData.Season].map(obj => {
        var home = props.matchupData.HomeTeamStats[obj.id] && +props.matchupData.HomeTeamStats[obj.id]
        var away = props.matchupData.AwayTeamStats[obj.id] && +props.matchupData.AwayTeamStats[obj.id]
        var winner = [
          (home > away || away === '') ? "win" : (home < away || home === '') ? "loss" : "tie",
          (away > home || home === '') ? "win" : (away < home || away === '') ? "loss" : "tie"
        ]
        if (obj.content === "GAA" && away !== '' && home !== '') { winner = [winner[1],winner[0]] }
        return (
          <div className="matchuppage-stat-row" key={obj.id}>
            <div className={['team-stat',winner[1]].join(" ")}>{away}</div>
            <div className="stat-label">{obj.content}</div>
            <div className={['team-stat',winner[0]].join(" ")}>{home}</div>
          </div>
        )
      })}
      {props.matchupData.firstStar &&
      <div className="matchup-threestars">
        <div className="starsymbol">{[1].map(obj => <span style={{"color":"#ffd700"}}>{'\u2605'}</span>)}</div>
        {props.matchupData.HomeTeamData.id === props.matchupData.firstStar.gshlTeam ? <div className="starteamlogo"><img src={props.matchupData.HomeTeamData.LogoURL} alt={props.matchupData.HomeTeamData.TeamName+"Logo"} /></div> : <div className="starteamlogo"><img src={props.matchupData.AwayTeamData.LogoURL} alt={props.matchupData.AwayTeamData.TeamName+"Logo"} /></div>}
        <div className="starname">{props.matchupData.firstStar.PlayerName}, {props.matchupData.firstStar.nhlPos}</div>
        <div className="starsymbol">{[1,2].map(obj => <span style={{"color":"#c0c0c0"}}>{'\u2605'}</span>)}</div>
        {props.matchupData.HomeTeamData.id === props.matchupData.secondStar.gshlTeam ? <div className="starteamlogo"><img src={props.matchupData.HomeTeamData.LogoURL} alt={props.matchupData.HomeTeamData.TeamName+"Logo"} /></div> : <div className="starteamlogo"><img src={props.matchupData.AwayTeamData.LogoURL} alt={props.matchupData.AwayTeamData.TeamName+"Logo"} /></div>}
        <div className="starname">{props.matchupData.secondStar.PlayerName}, {props.matchupData.secondStar.nhlPos}</div>
        <div className="starsymbol">{[1,2,3].map(obj => <span style={{"color":"#cd7f32"}}>{'\u2605'}</span>)}</div>
        {props.matchupData.HomeTeamData.id === props.matchupData.thirdStar.gshlTeam ? <div className="starteamlogo"><img src={props.matchupData.HomeTeamData.LogoURL} alt={props.matchupData.HomeTeamData.TeamName+"Logo"} /></div> : <div className="starteamlogo"><img src={props.matchupData.AwayTeamData.LogoURL} alt={props.matchupData.AwayTeamData.TeamName+"Logo"} /></div>}
        <div className="starname">{props.matchupData.thirdStar.PlayerName}, {props.matchupData.thirdStar.nhlPos}</div>
      </div>
      }
    </div>
  )
}

export default MatchupStats