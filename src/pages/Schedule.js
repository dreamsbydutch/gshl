import React, { useEffect, useState } from 'react'
import { SeasonToggleNavbar, ScheduleToggleNavbar, WeeksToggle, TeamsToggle } from '../components/PageNavbar'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { queryFunc } from '../utils/fetchData'
import LoadingSpinner from '../components/LoadingSpinner'
import { useTeams, useWeeks } from '../utils/context'

export default function Schedule() {
  const [schedType, setSchedType] = useState('Week')
  const [seasonID, setSeasonID] = useState('2023')

  return (
    <div className='my-3 mx-2'>
      <SeasonToggleNavbar setter={setSeasonID} activeKey={seasonID} />
      <ScheduleToggleNavbar setter={setSchedType} activeKey={schedType} />
      {schedType === 'Week' ? <WeeklySchedule {...{ seasonID }} /> : <TeamSchedule {...{ seasonID }} />}
    </div>
  )
}


function WeeklySchedule({ seasonID }) {
  const weeks = useWeeks()
  const [weekID, setWeekID] = useState(null)
  useEffect(() => {
    setWeekID(weeks.currentWeek?.WeekNum)
  }, [weeks.currentWeek])

  const scheduleData = useQuery(['MainInput', 'Schedule'], queryFunc)

  if (!scheduleData.data) { return <LoadingSpinner /> }
  return (
    <>
      <div className="mt-10">
        <WeeksToggle setter={setWeekID} season={seasonID} activeKey={weekID} />
      </div>
      <div className='grid grid-cols-7 items-center text-center font-bold mt-4 mb-2'>
        <div className='text-xs col-span-3'>Away Team</div>
        <div className='text-xs'>Score</div>
        <div className='text-xs col-span-3'>Home Team</div>
      </div>
      {scheduleData.data
        ?.filter(obj => (isNaN(+weekID) ? obj.GameType === weekID : +obj.WeekNum === +weekID) && +obj.Season === +seasonID)
        .sort((a, b) => +a.MatchupNum - +b.MatchupNum)
        .map(matchup => <WeekScheduleItem {...{ matchup, seasonID }} />)}
    </>
  )
}
function WeekScheduleItem({ matchup }) {
  console.log(matchup)
  const gshlTeams = useTeams()
  const homeTeam = gshlTeams?.filter(obj => +obj.id === +matchup.HomeTeam)[0]
  const awayTeam = gshlTeams?.filter(obj => +obj.id === +matchup.AwayTeam)[0]

  let conf = matchup.GameType + awayTeam?.Conference + homeTeam?.Conference, bgClass = ''

  switch (conf) {
    case 'CCSVSV':
      bgClass = 'bg-sunview-50 bg-opacity-50'
      break
    case 'CCHHHH':
      bgClass = 'bg-hotel-50 bg-opacity-50'
      break
    case 'NCSVHH':
      bgClass = 'bg-gradient-to-r from-sunview-50 to-hotel-50 bg-opacity-10'
      break
    case 'NCHHSV':
      bgClass = 'bg-gradient-to-r from-hotel-50 to-sunview-50 bg-opacity-10'
      break
    case 'QFSVSV':
    case 'QFHHHH':
    case 'QFHHSV':
    case 'QFSVHH':
      bgClass = 'bg-orange-200 bg-opacity-30'
      break
    case 'SFSVSV':
    case 'SFHHHH':
    case 'SFHHSV':
    case 'SFSVHH':
      bgClass = 'bg-slate-200 bg-opacity-30'
      break
    case 'FSVSV':
    case 'FHHHH':
    case 'FHHSV':
    case 'FSVHH':
      bgClass = 'bg-yellow-200 bg-opacity-30'
      break
    case 'LTSVSV':
    case 'LTHHHH':
    case 'LTHHSV':
    case 'LTSVHH':
      bgClass = 'bg-brown-200 bg-opacity-40'
      break
    default:
      bgClass = 'bg-gray-100'
      break
  }

  if (!gshlTeams || !homeTeam || !awayTeam) { return <></> }
  return (
    <Link className={`grid grid-cols-7 my-3 py-2 mx-2 items-center shadow-md rounded-xl ${bgClass}`} to={"/matchup/" + matchup.id}>
      <div className={'col-span-3 flex flex-col whitespace-nowrap text-center p-2 gap-2 items-center justify-center ' + matchup.HomeWL}>
        {+matchup.AwayRank <= 8 && matchup.AwayRank ?
          <div className='flex flex-row'>
            <span className='text-sm xs:text-base text-black font-bold font-oswald pr-1'>{'#' + matchup.AwayRank}</span>
            <img className='w-12 xs:w-16' src={awayTeam?.LogoURL} alt='Away Team Logo' />
          </div>
          :
          <img className='w-12 xs:w-16' src={awayTeam?.LogoURL} alt='Away Team Logo' />
        }
        <div className={'text-base xs:text-lg font-oswald'}>{awayTeam?.TeamName}</div>
      </div>
      <div className='text-lg xs:text-xl font-oswald text-center'>
        {matchup.HomeScore || matchup.AwayScore ?
          <>
            <span className={matchup.AwayWL === "W" ? 'text-emerald-700 font-bold' : matchup.AwayWL === "L" ? 'text-rose-800' : ''}>
              {matchup.AwayScore}
            </span>
            {' - '}
            <span className={matchup.HomeWL === "W" ? 'text-emerald-700 font-bold' : matchup.HomeWL === "L" ? 'text-rose-800' : ''}>
              {matchup.HomeScore}
            </span>
          </>
          : '@'
        }
      </div>
      <div className={'col-span-3 flex flex-col whitespace-nowrap text-center p-2 gap-2 items-center justify-center ' + matchup.HomeWL}>
        {+matchup.HomeRank <= 8 && matchup.HomeRank ?
          <div className='flex flex-row'>
            <span className='text-sm xs:text-base text-black font-bold font-oswald pr-1'>{'#' + matchup.HomeRank}</span>
            <img className='w-12 xs:w-16' src={homeTeam.LogoURL} alt='Home Team Logo' />
          </div>
          :
          <img className='w-12 xs:w-16' src={homeTeam.LogoURL} alt='Home Team Logo' />
        }
        <div className={'text-base xs:text-lg font-oswald'}>{homeTeam.TeamName}</div>
      </div>
    </Link>
  )
}

function TeamSchedule({ seasonID }) {
  const gshlTeams = useTeams()
  const [teamID, setTeamID] = useState(null)

  const scheduleData = useQuery(['MainInput', 'Schedule'], queryFunc)

  if (!scheduleData.data) { return <LoadingSpinner /> }
  return (
    <div className="my-10">
      <TeamsToggle setter={setTeamID} season={seasonID} activeKey={teamID} />
      {teamID &&
        <>
          <div className='text-xl text-center font-bold font-varela mt-10'>
            {gshlTeams?.filter(obj => obj[seasonID] === String(teamID))[0]['TeamName'] + ' Schedule'}
          </div>
          <div className='grid grid-cols-9 items-center text-center font-bold mt-2 mb-2'>
            <div className='text-xs'>Week</div>
            <div className='text-xs col-span-6'>Opponent</div>
            <div className='text-xs col-span-2'>Score</div>
          </div>
          {scheduleData.data
            ?.filter(obj => +obj.Season === +seasonID && (+obj.HomeTeam === +teamID || +obj.AwayTeam === +teamID))
            .map(matchup => <TeamScheduleItem {...{ matchup, teamID }} />)}
        </>
      }
    </div>
  )
}
function TeamScheduleItem({ matchup, teamID }) {
  const gshlTeams = useTeams()
  const opponent = +matchup.AwayTeam === +teamID ? gshlTeams.filter(obj => +obj.id === +matchup.HomeTeam)[0] : gshlTeams.filter(obj => +obj.id === +matchup.AwayTeam)[0]
  let output = <></>
  switch (matchup.GameType) {
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
      output = [matchup.WeekNum, opponent.Conference === "HH" ? 'text-hotel-800' : 'text-sunview-800']
      break

  }
  if (!opponent) { return <></> }
  return (
    <Link to={"/matchup/" + matchup.id}>
      <div className={`grid grid-cols-9 py-2 border-b ${output[1]}`}>
        <div className='place-self-center font-varela'>
          {output[0]}
        </div>
        <div className='col-span-6 text-base place-self-center font-varela'>
          {+matchup.AwayTeam === +teamID ? '@ ' + opponent.TeamName : 'v ' + opponent.TeamName}
        </div>
        {matchup.HomeScore && matchup.AwayScore &&
          <div className={`text-sm col-span-2 my-auto text-center font-varela ${(+matchup.HomeTeam === +teamID ? matchup.HomeWL : matchup.AwayWL) === "W" ? 'text-emerald-700 font-semibold' : (+matchup.HomeTeam === +teamID ? matchup.HomeWL : matchup.AwayWL) === "L" ? 'text-rose-800' : 'text-gray-500'}`}>
            <span className='pr-2'>{+matchup.HomeTeam === +teamID ? matchup.HomeWL : matchup.AwayWL}</span>
            <span>{+matchup.HomeTeam === +teamID ? matchup.HomeScore + ' - ' + matchup.AwayScore : matchup.AwayScore + ' - ' + matchup.HomeScore}</span>
          </div>
        }
      </div>
    </Link>
  )
}