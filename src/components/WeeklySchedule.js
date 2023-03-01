import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { WeeksToggle } from './PageNavbar'


export default function WeeklySchedule(props) {
  const [weekID, setWeekID] = useState(null)
  const [seasonID, setSeasonID] = useState(null)
  useEffect(() => {
    setSeasonID(props.currentWeek?.Season)
    setWeekID(props.currentWeek?.WeekNum)
  }, [props.currentWeek])

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
      {props.schedule
        .filter(obj => obj.WeekNum === String(weekID))
        .sort((a, b) => a.MatchupNum - b.MatchupNum)
        .map(obj => <ScheduleItem {...{'matchupData':obj, 'key':obj.id, 'currentWeek':props.currentWeek, 'gshlTeams':props.gshlTeams}} />)}
    </>
  )
}


function ScheduleItem(props) {
  const homeTeamInfo = props.gshlTeams?.filter(obj => obj[props.currentWeek.Season] === props.matchupData.HomeTeam)[0]
  const awayTeamInfo = props.gshlTeams?.filter(obj => obj[props.currentWeek.Season] === props.matchupData.AwayTeam)[0]

  let conf = props.matchupData.GameType + awayTeamInfo?.Conference + homeTeamInfo?.Conference, bgClass = ''

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

  if (!props.gshlTeams) { return <></> }
  return (
    <Link className={`grid grid-cols-7 my-3 py-2 mx-2 items-center shadow-md rounded-xl ${bgClass}`} to={"/matchup/" + props.matchupData.id}>
      <div className={'col-span-3 flex flex-col whitespace-nowrap text-center p-2 gap-2 items-center justify-center ' + props.matchupData.HomeWL}>
        {+props.matchupData.AwayRank <= 8 && props.matchupData.AwayRank ?
          <div className='flex flex-row'>
            <span className='text-sm xs:text-base text-black font-bold font-oswald pr-1'>{'#' + props.matchupData.AwayRank}</span>
            <img className='w-12 xs:w-16' src={awayTeamInfo?.LogoURL} alt='Away Team Logo' />
          </div>
          :
          <img className='w-12 xs:w-16' src={awayTeamInfo?.LogoURL} alt='Away Team Logo' />
        }
        <div className={'text-base xs:text-lg font-oswald'}>{awayTeamInfo?.TeamName}</div>
      </div>
      <div className='text-lg xs:text-xl font-oswald text-center'>
        {props.matchupData.HomeScore || props.matchupData.AwayScore ?
          <>
            <span className={props.matchupData.AwayWL === "W" ? 'text-emerald-700 font-bold' : props.matchupData.AwayWL === "L" ? 'text-rose-800' : ''}>
              {props.matchupData.AwayScore}
            </span>
            {' - '}
            <span className={props.matchupData.HomeWL === "W" ? 'text-emerald-700 font-bold' : props.matchupData.HomeWL === "L" ? 'text-rose-800' : ''}>
              {props.matchupData.HomeScore}
            </span>
          </>
          : '@'
        }
      </div>
      <div className={'col-span-3 flex flex-col whitespace-nowrap text-center p-2 gap-2 items-center justify-center ' + props.matchupData.HomeWL}>
        {+props.matchupData.HomeRank <= 8 && props.matchupData.HomeRank ?
          <div className='flex flex-row'>
            <span className='text-sm xs:text-base text-black font-bold font-oswald pr-1'>{'#' + props.matchupData.HomeRank}</span>
            <img className='w-12 xs:w-16' src={homeTeamInfo.LogoURL} alt='Home Team Logo' />
          </div>
          :
          <img className='w-12 xs:w-16' src={homeTeamInfo.LogoURL} alt='Home Team Logo' />
        }
        <div className={'text-base xs:text-lg font-oswald'}>{homeTeamInfo.TeamName}</div>
      </div>
    </Link>
  )
}