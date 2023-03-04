import React from 'react'
import { useQuery } from 'react-query'
import ErrorPage from '../components/ErrorPage'
import LoadingSpinner from '../components/LoadingSpinner'
import MatchupScroller from '../components/MatchupScroller'
import PowerRankings from '../components/PowerRankings'
import { formatDate, queryFunc } from '../utils/fetchData'

export default function Home() {

  let date = new Date()
  const hour = date.getHours()
  date = new Date(date.getFullYear(), date.getMonth(), hour < 5 ? date.getDate() - 1 : date.getDate())
  const yesterday = formatDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1))
  const season = String((date.getMonth() < 8 ? date.getFullYear() : date.getFullYear() + 1))

  const gshlTeamsData = useQuery(['Home', 'MainInput', 'GSHLTeams'], queryFunc)
  const weeks = useQuery([['Home', 'LastWeek'], 'MainInput', 'Weeks'], queryFunc)
  const playerDaysData = useQuery([['Home', 'PlayerDays'], season + 'PlayerData', 'Days'], queryFunc)
  const playerWeeksData = useQuery([['Home', 'PlayerWeeks'], season + 'PlayerData', 'Weeks'], queryFunc)

  const currentWeek = weeks.data?.filter(obj => (obj.Season === season) && ((new Date(obj.StartDate + ' 00:00:00')) <= date) && ((new Date(obj.EndDate + ' 00:00:00')) >= date))[0]
  const missedStarts = playerDaysData.data?.filter(obj => obj.Date === yesterday && obj.MS === '1').sort((a, b) => b.Rating - a.Rating).sort((a, b) => a.gshlTeam - b.gshlTeam)
  const weeklyStars = playerWeeksData.data?.filter(obj => +obj.WeekNum === +currentWeek?.WeekNum - 1).sort((a, b) => b.Rating - a.Rating).slice(0, 3)
  const gshlTeams = gshlTeamsData.data?.filter(obj => obj[season])


  if (weeks.isLoading || gshlTeamsData.isLoading || playerDaysData.isLoading || playerWeeksData.isLoading) { return <LoadingSpinner /> }
  if (weeks.error || gshlTeamsData.error || playerDaysData.error || playerWeeksData.error) { return <ErrorPage /> }
  return (
    <>
      <MatchupScroller />
      <MissedStarts {...{ currentWeek, missedStarts, gshlTeams }} />
      <PowerRankings />
      <WeeklyStars {...{ currentWeek, weeklyStars, gshlTeams }} />
    </>
  )
}


function MissedStarts(props) {
  if (props.missedStarts?.length === 0) { return <div></div> }
  return (
    <div className="bg-rose-100 text-rose-900 mx-3 my-4 py-2 rounded-xl shadow-md font-varela">
      <div className="text-center py-1 text-2xl font-bold">Yesterday's Missed Starts</div>
      {props.gshlTeams?.map(team => {
        const missedStarts = props.missedStarts?.filter(a => +a.gshlTeam === +team[props.currentWeek.Season])
        if (missedStarts.length === 0) { return <></> }
        return (
          <div key={team[props.currentWeek.Season]} className='px-3 py-1 flex items-center justify-center text-lg border-t border-rose-800'>
            <img className="w-12 xs:w-12 mx-2" src={team.LogoURL} alt={team.teamName + " Logo"} />
            <div className='px-3 py-1 flex flex-col items-center justify-center text-lg'>
              {missedStarts?.map(b => {
                return (
                  <span className={b.nhlPos === 'G' ? 'opacity-70' : ''}>{b.PlayerName}, {b.nhlPos}</span>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function WeeklyStars(props) {
  if (!props.weeklyStars) { return <div></div> }
  return (
    <div className="bg-gray-100 mx-3 my-4 py-2 rounded-xl shadow-md font-varela">
      <div className="mt-8 text-lg text-center font-bold">{`Week ${+props.currentWeek?.WeekNum - 1}'s Three Stars`}</div>
      {props.weeklyStars[0] &&
        <div className="w-11/12 mt-2 mx-auto flex flex-col p-1 gap-4 items-center font-varela">
          <div className="grid grid-cols-7 m-auto w-11/12 text-center">
            <div className="text-3xl text-yellow-300 m-auto">
              {'\u2605'}
            </div>
            {/* <img
              className='my-auto'
              src={props.matchupData.AwayTeam === props.weeklyStars[0].gshlTeam ? props.matchupData.awayTeamInfo.LogoURL : props.matchupData.homeTeamInfo.LogoURL}
              alt='First Star Team Logo'
            /> */}
            <div className="text-lg font-normal col-span-5 m-auto items-center inline-block">
              {props.weeklyStars[0].PlayerName}, {props.weeklyStars[0].nhlPos}
              <img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${props.weeklyStars[0].nhlTeam}.png`} alt="" className='inline-block h-5 w-5 mx-1.5' />
              {props.weeklyStars[0].nhlPos === 'G' ?
                <div className='text-2xs mx-1'>{`${props.weeklyStars[0].W} W / ${props.weeklyStars[0].GAA} GAA / ${props.weeklyStars[0].SVP} SV% / ${Math.round(props.weeklyStars[0].Rating * 100) / 100} Rtg`}</div>
                :
                <div className='text-2xs mx-1'>{`${props.weeklyStars[0].G} G / ${props.weeklyStars[0].A} A / ${props.weeklyStars[0].P} P / ${props.weeklyStars[0].PPP} PPP / ${props.weeklyStars[0].SOG} SOG / ${props.weeklyStars[0].HIT} HIT / ${props.weeklyStars[0].BLK} BLK / ${Math.round(props.weeklyStars[0].Rating * 100) / 100} Rtg`}</div>
              }
            </div>
          </div>
          <div className="grid grid-cols-7 m-auto w-11/12 text-center">
            <div className="text-2xl text-slate-300 m-auto">
              {'\u2605'}{'\u2605'}
            </div>
            {/* <img
              className='my-auto'
              src={props.matchupData.AwayTeam === props.weeklyStars[1].gshlTeam ? props.matchupData.awayTeamInfo.LogoURL : props.matchupData.homeTeamInfo.LogoURL}
              alt='Second Star Team Logo'
            /> */}
            <div className="text-lg font-normal col-span-5 m-auto items-center inline-block">
              {props.weeklyStars[1].PlayerName}, {props.weeklyStars[1].nhlPos}
              <img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${props.weeklyStars[1].nhlTeam}.png`} alt="" className='inline-block h-5 w-5 mx-1.5' />
              {props.weeklyStars[1].nhlPos === 'G' ?
                <div className='text-2xs mx-1'>{`${props.weeklyStars[1].W} W / ${props.weeklyStars[1].GAA} GAA / ${props.weeklyStars[1].SVP} SV% / ${Math.round(props.weeklyStars[1].Rating * 100) / 100} Rtg`}</div>
                :
                <div className='text-2xs mx-1'>{`${props.weeklyStars[1].G} G / ${props.weeklyStars[1].A} A / ${props.weeklyStars[1].P} P / ${props.weeklyStars[1].PPP} PPP / ${props.weeklyStars[1].SOG} SOG / ${props.weeklyStars[1].HIT} HIT / ${props.weeklyStars[1].BLK} BLK / ${Math.round(props.weeklyStars[1].Rating * 100) / 100} Rtg`}</div>
              }
            </div>
          </div>
          <div className="grid grid-cols-7 m-auto w-11/12 text-center">
            <div className="text-xl text-orange-700 my-auto text-center">
              {'\u2605'}<br></br>{'\u2605'}{'\u2605'}
            </div>
            {/* <img
              className='my-auto'
              src={props.matchupData.AwayTeam === props.weeklyStars[2].gshlTeam ? props.matchupData.awayTeamInfo.LogoURL : props.matchupData.homeTeamInfo.LogoURL}
              alt='Third Star Team Logo'
            /> */}
            <div className="text-lg font-normal col-span-5 m-auto items-center inline-block">
              {props.weeklyStars[2].PlayerName}, {props.weeklyStars[2].nhlPos}
              <img src={`https://raw.githubusercontent.com/dreamsbydutch/gshl/main/public/assets/Logos/nhlTeams/${props.weeklyStars[2].nhlTeam}.png`} alt="" className='inline-block h-5 w-5 mx-1.5' />
              {props.weeklyStars[2].nhlPos === 'G' ?
                <div className='text-2xs mx-1'>{`${props.weeklyStars[2].W} W / ${props.weeklyStars[2].GAA} GAA / ${props.weeklyStars[2].SVP} SV% / ${Math.round(props.weeklyStars[2].Rating * 100) / 100} Rtg`}</div>
                :
                <div className='text-2xs mx-1'>{`${props.weeklyStars[2].G} G / ${props.weeklyStars[2].A} A / ${props.weeklyStars[2].P} P / ${props.weeklyStars[2].PPP} PPP / ${props.weeklyStars[2].SOG} SOG / ${props.weeklyStars[2].HIT} HIT / ${props.weeklyStars[2].BLK} BLK / ${Math.round(props.weeklyStars[2].Rating * 100) / 100} Rtg`}</div>
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}