import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TeamsToggle } from './PageNavbar'

export default function TeamSchedule(props) {
  const [teamID, setTeamID] = useState(null)
  const [seasonID, setSeasonID] = useState(null)
  useEffect(() => {
    setSeasonID(props.currentWeek?.Season)
  }, [props.currentWeek])

  return (
    <div className="my-10">
      <TeamsToggle setter={setTeamID} season={seasonID} activeKey={teamID} />
      {teamID &&
        <>
          <div className='text-xl text-center font-bold font-varela mt-10'>
            {props.gshlTeams.filter(obj => obj[seasonID] === String(teamID))[0]['TeamName'] + ' Schedule'}
          </div>
          <div className='grid grid-cols-9 items-center text-center font-bold mt-2 mb-2'>
            <div className='text-xs'>Week</div>
            <div className='text-xs col-span-6'>Opponent</div>
            <div className='text-xs col-span-2'>Score</div>
          </div>
          {props.schedule
            .filter(obj => obj.HomeTeam === String(teamID) || obj.AwayTeam === String(teamID))
            .map(obj => <ScheduleItem {...{ 'matchupData': obj, 'key': obj.id, teamID, 'gshlTeams': props.gshlTeams }} />)}
        </>
      }
    </div>
  )
}


function ScheduleItem(props) {
  var opponent = props.matchupData.AwayTeam === props.teamID ? props.gshlTeams.filter(obj => obj[props.matchupData.Season] === props.matchupData.HomeTeam)[0] : props.gshlTeams.filter(obj => obj[props.matchupData.Season] === props.matchupData.AwayTeam)[0]
  var output = <></>
  switch (props.matchupData.GameType) {
    case "QF":
      output = ['QF', 'text-orange-800']
      break
    case "SF":
      output = ['SF', 'text-slate-700']
      break
    case "F":
      output = ['F', 'text-yellow-800']
      break
    case "LT":
      output = ['LT', 'text-brown-800']
      break
    default:
      output = [props.matchupData.WeekNum, opponent.Conference === "HH" ? 'text-hotel-800' : 'text-sunview-800']
      break

  }
  if (!opponent) { return <></> }
  return (
    <Link to={"/matchup/" + props.matchupData.id}>
      <div className={`grid grid-cols-9 py-2 border-b ${output[1]}`}>
        <div className='place-self-center font-varela'>
          {output[0]}
        </div>
        <div className='col-span-6 text-base place-self-center font-varela'>
          {props.matchupData.AwayTeam === props.teamID ? '@ ' + opponent.TeamName : 'v ' + opponent.TeamName}
        </div>
        {props.matchupData.HomeScore && props.matchupData.AwayScore &&
          <div className={`text-sm col-span-2 my-auto text-center font-varela ${(props.matchupData.HomeTeam === props.teamID ? props.matchupData.HomeWL : props.matchupData.AwayWL) === "W" ? 'text-emerald-700 font-semibold' : (props.matchupData.HomeTeam === props.teamID ? props.matchupData.HomeWL : props.matchupData.AwayWL) === "L" ? 'text-rose-800' : 'text-gray-500'}`}>
            <span className='pr-2'>{props.matchupData.HomeTeam === props.teamID ? props.matchupData.HomeWL : props.matchupData.AwayWL}</span>
            <span>{props.matchupData.HomeTeam === props.teamID ? props.matchupData.HomeScore + ' - ' + props.matchupData.AwayScore : props.matchupData.AwayScore + ' - ' + props.matchupData.HomeScore}</span>
          </div>
        }
      </div>
    </Link>
  )
}