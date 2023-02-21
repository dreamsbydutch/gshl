import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { WeeksToggle } from './PageNavbar'


export default function WeeklySchedule(props) {
  const [weekID, setWeekID] = useState(1)
  const [seasonID, setSeasonID] = useState(null)
  useEffect(() => {
    setSeasonID(props.data.currentWeek.Season)
    setWeekID(props.data.currentWeek.WeekNum)
  }, [props.data.currentWeek])

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
      {props.data.schedule
        .filter(obj => obj.WeekNum === String(weekID))
        .sort((a, b) => a.MatchupNum - b.MatchupNum)
        .map(obj => obj.homeTeamInfo && obj.awayTeamInfo && <ScheduleItem data={obj} key={obj.id} />)}
    </>
  )
}


function ScheduleItem(props) {
  let conf = props.data.GameType + props.data.awayTeamInfo.Conference + props.data.homeTeamInfo.Conference, bgClass = ''

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

  return (
    <Link className={`grid grid-cols-7 my-3 py-2 mx-2 items-center shadow-md rounded-xl ${bgClass}`} to={"/matchup/" + props.data.id}>
      <div className={'col-span-3 flex flex-col whitespace-nowrap text-center p-2 gap-2 items-center justify-center ' + props.data.HomeWL}>
        {+props.data.AwayRank <= 8 && props.data.AwayRank ?
          <div className='flex flex-row'>
            <span className='text-sm xs:text-base text-black font-bold font-oswald pr-1'>{'#' + props.data.AwayRank}</span>
            <img className='w-12 xs:w-16' src={props.data.awayTeamInfo.LogoURL} alt='Away Team Logo' />
          </div>
          :
          <img className='w-12 xs:w-16' src={props.data.awayTeamInfo.LogoURL} alt='Away Team Logo' />
        }
        <div className={'text-base xs:text-lg font-oswald'}>{props.data.awayTeamInfo.TeamName}</div>
      </div>
      <div className='text-lg xs:text-xl font-oswald text-center'>
        {props.data.HomeScore || props.data.AwayScore ?
          <>
            <span className={props.data.AwayWL === "W" ? 'text-emerald-700 font-bold' : props.data.AwayWL === "L" ? 'text-rose-800' : ''}>
              {props.data.AwayScore}
            </span>
            {' - '}
            <span className={props.data.HomeWL === "W" ? 'text-emerald-700 font-bold' : props.data.HomeWL === "L" ? 'text-rose-800' : ''}>
              {props.data.HomeScore}
            </span>
          </>
          : '@'
        }
      </div>
      <div className={'col-span-3 flex flex-col whitespace-nowrap text-center p-2 gap-2 items-center justify-center ' + props.data.HomeWL}>
        {+props.data.HomeRank <= 8 && props.data.HomeRank ?
          <div className='flex flex-row'>
            <span className='text-sm xs:text-base text-black font-bold font-oswald pr-1'>{'#' + props.data.HomeRank}</span>
            <img className='w-12 xs:w-16' src={props.data.homeTeamInfo.LogoURL} alt='Home Team Logo' />
          </div>
          :
          <img className='w-12 xs:w-16' src={props.data.homeTeamInfo.LogoURL} alt='Home Team Logo' />
        }
        <div className={'text-base xs:text-lg font-oswald'}>{props.data.homeTeamInfo.TeamName}</div>
      </div>
    </Link>
  )
}