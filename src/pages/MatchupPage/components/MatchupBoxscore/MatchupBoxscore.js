import React, { useState } from 'react'
import PageNavbar from '../../../../components/Navbar/PageNavbar'
import { categories } from '../../../../utils/constants'
import './MatchupBoxscore.css'

function MatchupBoxscore(props) {
  const [boxscoreTeam, setBoxscoreTeam] = useState('Home')

  const pageNavData = [
    {
      'content': props.matchupData.AwayTeamData.TeamName,
      'onClick': () => setBoxscoreTeam('Away'),
      'key': 'Away'
    },
    {
      'content': props.matchupData.HomeTeamData.TeamName,
      'onClick': () => setBoxscoreTeam('Home'),
      'key': 'Home'
    }
  ]

  if (!props.matchupData.HomePlayerStats || !props.matchupData.AwayPlayerStats) { return <></> }
  return (
    <>
      <PageNavbar data={pageNavData} setter={setBoxscoreTeam} activeKey={boxscoreTeam} />
      <div className="matchuppage-matchupboxscore">
        <table>
          <thead>
            <tr key="Header">
              <th className="head" key="Player">Player</th>
              <th key="Pos">Pos</th>
              <th key="Team">Team</th>
              <th key="GS">GS</th>
              {categories[props.matchupData.Season].map(obj => <th key={obj.id}>{obj.id}</th>)}
            </tr>
          </thead>
          <tbody>
            {props.matchupData[boxscoreTeam + "PlayerStats"].map(player => {
              return (
                <tr key={player.id}>
                  <td className="head" key="Player">{player.PlayerName}</td>
                  <td key="Pos">{player.nhlPos}</td>
                  <td key="Team">{player.nhlTeam}</td>
                  <td key="GS">{player.GS}</td>
                  {categories[props.matchupData.Season].map(obj => <td key={obj.id}>{player[obj.id]}</td>)}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default MatchupBoxscore