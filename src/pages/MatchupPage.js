import React from 'react'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import { useMatchupByID } from '../utils/fetchData'
// import MatchupHeader from './MatchupPage/components/MatchupHeader/MatchupHeader'
// import MatchupStats from './MatchupPage/components/MatchupStats/MatchupStats'
// import MatchupBoxscore from './MatchupPage/components/MatchupBoxscore/MatchupBoxscore'

export default function MatchupPage() {
  const { id } = useParams()
  const matchupData = useMatchupByID(id)
  if (!matchupData.data) { return <LoadingSpinner /> }


  return (
    <>
      <MatchupHeader matchupData={matchupData.data} />
      <MatchupStats matchupData={matchupData.data} />
      {/* <MatchupBoxscore matchupData={matchupData.data} /> */}
    </>
  )
}

function MatchupHeader(props) {
  return (
    <div className="flex flex-row justify-center items-center gap-4 mt-8">
      <div className="flex flex-row justify-center items-center gap-2 w-20">
        <img src={props.matchupData.AwayTeamInfo.LogoURL} alt={props.matchupData.AwayTeamInfo.TeamName + "Logo"} />
        <div className={`text-2xl ${props.matchupData.AwayWL === "W" ? 'font-bold text-emerald-800' : props.matchupData.AwayWL === "L" ? 'text-rose-800' : ''}`}>
          {props.matchupData.AwayScore}
        </div>
      </div>
      <div className="symbol">@</div>
      <div className="flex flex-row justify-center items-center gap-2 w-20">
        <div className={`text-2xl ${props.matchupData.HomeWL === "W" ? 'font-bold text-emerald-800' : props.matchupData.HomeWL === "L" ? 'text-rose-800' : ''}`}>
          {props.matchupData.HomeScore}
        </div>
        <img src={props.matchupData.HomeTeamInfo.LogoURL} alt={props.matchupData.HomeTeamInfo.TeamName + "Logo"} />
      </div>
    </div>
  )
}


function MatchupStats(props) {
  console.log(props)
  // if (!props.matchupData.HomeTeamStats || !props.matchupData.AwayTeamStats || !props.matchupData.HomePlayerStats || !props.matchupData.AwayPlayerStats) {return <></>}
  return (
    <div className="my-6">
      {/* {categories[props.matchupData.Season].map(obj => {
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
      })} */}
      {props.matchupData.FirstStar &&
        <div className="w-5/6 mt-8 mx-auto grid grid-cols-8 p-1 gap-2 items-center font-varela">
          <div className="text-4xl">
            {[1].map(obj =>
              <span style={{ "color": "#ffd700" }}>
                {'\u2605'}
              </span>
            )}
          </div>
          {props.matchupData.HomeTeamInfo[props.matchupData.Season] === props.matchupData.FirstStar.gshlTeam
            ?
            <div className="starteamlogo">
              <img
                src={props.matchupData.HomeTeamInfo.LogoURL}
                alt={props.matchupData.HomeTeamInfo.TeamName + "Logo"}
              />
            </div>
            :
            <div className="starteamlogo">
              <img
                src={props.matchupData.AwayTeamInfo.LogoURL}
                alt={props.matchupData.AwayTeamInfo.TeamName + "Logo"}
              />
            </div>
          }
          <div className="text-lg font-normal">
            {props.matchupData.FirstStar.PlayerName}, {props.matchupData.FirstStar.nhlPos}
          </div>
          <div className="starsymbol">
            {[1, 2].map(obj =>
              <span style={{ "color": "#c0c0c0" }}>
                {'\u2605'}
              </span>
            )}
          </div>
          {props.matchupData.HomeTeamInfo.id === props.matchupData.SecondStar.gshlTeam ? <div className="starteamlogo"><img src={props.matchupData.HomeTeamInfo.LogoURL} alt={props.matchupData.HomeTeamInfo.TeamName + "Logo"} /></div> : <div className="starteamlogo"><img src={props.matchupData.AwayTeamInfo.LogoURL} alt={props.matchupData.AwayTeamInfo.TeamName + "Logo"} /></div>}
          <div className="starname">{props.matchupData.SecondStar.PlayerName}, {props.matchupData.SecondStar.nhlPos}</div>
          <div className="starsymbol">{[1, 2, 3].map(obj => <span style={{ "color": "#cd7f32" }}>{'\u2605'}</span>)}</div>
          {props.matchupData.HomeTeamInfo.id === props.matchupData.ThirdStar.gshlTeam ? <div className="starteamlogo"><img src={props.matchupData.HomeTeamInfo.LogoURL} alt={props.matchupData.HomeTeamInfo.TeamName + "Logo"} /></div> : <div className="starteamlogo"><img src={props.matchupData.AwayTeamInfo.LogoURL} alt={props.matchupData.AwayTeamInfo.TeamName + "Logo"} /></div>}
          <div className="starname">{props.matchupData.ThirdStar.PlayerName}, {props.matchupData.ThirdStar.nhlPos}</div>
        </div>
      }
    </div>
  )
}