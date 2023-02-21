import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TeamsToggle } from './PageNavbar'

export default function TeamSchedule(props) {
  const [teamID, setTeamID] = useState(1)
  const [seasonID, setSeasonID] = useState(null)
  useEffect(() => {
    setSeasonID(props.data.currentWeek.Season)
  }, [props.data.currentWeek])
  console.log(props)

  return (
    <div className="my-10">
      <TeamsToggle setter={setTeamID} season={seasonID} activeKey={teamID} />
      <div className='text-xl text-center font-bold font-varela mt-10'>{props.data.schedule.filter(obj => obj.HomeTeam === String(teamID))[0]['homeTeamInfo']['TeamName']+ ' Schedule'}</div>
      <div className='grid grid-cols-9 items-center text-center font-bold mt-2 mb-2'>
        <div className='text-xs'>Week</div>
        <div className='text-xs col-span-6'>Opponent</div>
        <div className='text-xs col-span-2'>Score</div>
      </div>
      {props.data.schedule
        .filter(obj => obj.HomeTeam === String(teamID) || obj.AwayTeam === String(teamID))
        .map(obj => obj.homeTeamInfo && obj.awayTeamInfo && <ScheduleItem data={obj} key={obj.id} teamID={String(teamID)} />)}
    </div>
  )
}


function ScheduleItem(props) {
  var opponent = props.data.AwayTeam === props.teamID ? props.data.homeTeamInfo : props.data.awayTeamInfo
  var output = <></>
  switch (props.data.GameType) {
    case "QF":
      output = ['QF','text-orange-800']
      break
    case "SF":
      output = ['SF','text-slate-700']
      break
    case "F":
      output = ['F','text-yellow-800']
      break
    case "LT":
      output = ['LT','text-brown-800']
      break
    default:
      output = [props.data.WeekNum,opponent.Conference === "HH" ? 'text-hotel-800' : 'text-sunview-800']
      break

  }
  return (
    <Link to={"/matchup/" + props.data.id}>
        <div className={`grid grid-cols-9 py-2 border-b ${output[1]}`}>
          <div className='place-self-center font-varela'>
            {output[0]}
          </div>
          <div className='col-span-6 text-base place-self-center font-varela'>
            {props.data.AwayTeam === props.teamID ? '@ ' + opponent.TeamName : 'v ' + opponent.TeamName}
          </div>
          {props.data.HomeScore && props.data.AwayScore &&
            <div className={`text-sm col-span-2 my-auto text-center font-varela ${(props.data.HomeTeam === props.teamID ? props.data.HomeWL : props.data.AwayWL) === "W" ? 'text-emerald-700 font-semibold' : (props.data.HomeTeam === props.teamID ? props.data.HomeWL : props.data.AwayWL) === "L" ? 'text-rose-800' : 'text-gray-500'}`}>
              <span className='pr-2'>{props.data.HomeTeam === props.teamID ? props.data.HomeWL : props.data.AwayWL}</span>
              <span>{props.data.HomeTeam === props.teamID ? props.data.HomeScore + ' - ' + props.data.AwayScore : props.data.AwayScore + ' - ' + props.data.HomeScore}</span>
            </div>
          }
        </div>
      </Link>
  )
}