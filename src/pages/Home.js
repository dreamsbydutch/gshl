import React from 'react'
import { useSchedule, useStandings } from '../utils/fetchData'
import LoadingSpinner from '../components/LoadingSpinner'
import { Link } from 'react-router-dom'

export default function Home(props) {
  const currentWeek = props.currentWeek
  const standingsData = useStandings(currentWeek.Season)
  const scheduleData = useSchedule(currentWeek.Season)
  if (scheduleData.isLoading || standingsData.isLoading) { return <LoadingSpinner /> }
  if (scheduleData.isError || standingsData.isError) { return <div>Error</div> }
  const data = {
    'schedule': scheduleData.data,
    'standings': standingsData.data,
    currentWeek,
  }
  return (
    <>
      <MatchupScroller data={data} />
      <TeamRankings data={data} />
    </>
  )
}


function TeamRankings(props) {
  return (
    <div className="mx-3 max-w-3xl my-8 py-4 px-1 rounded-2xl bg-gray-100 hover:text-gray-800 shadow-md">
      <div className="font-oswald text-4xl font-extrabold text-center mt-2 mb-2">GSHL Power Rankings</div>
      <ul className="mx-2 p-0 [&>*:last-child]:border-none">
        {props.data.standings.sort((a, b) => a.Rk - b.Rk).map(obj => {
          var output = props.data.schedule.filter(schedItem => (schedItem.HomeTeam === obj.teamID || schedItem.AwayTeam === obj.teamID) && schedItem.WeekNum === String(props.data.currentWeek.WeekNum - 1))[0]
          var rankChange = []
          if (obj.RkCh > 0) {
            rankChange = [Math.abs(obj.RkCh), "RkUp"]
          } else if (obj.RkCh < 0) {
            rankChange = [Math.abs(obj.RkCh), "RkDn"]
          } else {
            rankChange = [Math.abs(obj.RkCh), "Even"]
          }
          return (
            <li className="border-b border-gray-600 py-2.5 flex items-center" key={obj.teamID}>
              <div className="font-oswald text-base xs:text-lg font-bold w-4 mx-2 flex flex-row justify-around">
                {obj.Rk}
                <div className={`font-oswald pl-1 text-2xs sm:text-xs self-center ${rankChange[1] === "RkUp" ? 'text-emerald-800' : rankChange[1] === "RkDn" ? 'text-rose-800' : 'text-gray-800'}`}>
                  {rankChange[1] === "RkUp" ? '\u2191' : rankChange[1] === "RkDn" ? '\u2193' : '\u2194'}
                  {rankChange[1] === "Even" ? null : rankChange[0]}
                </div>
              </div>
              <img className="w-12 xs:w-12 mx-2" src={obj.logoURL} alt={obj.teamName + " Logo"} />
              <RankingItem data={{ 'teamData': obj, 'lastWeekData': output }} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
function RankingItem(props) {
  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <div className="font-bold text-base xs:text-lg px-2 my-auto text-center">{props.data.teamData.teamName}</div>
      <div className="flex flex-row items-center flex-wrap">
        <div className="text-xs xs:text-sm pr-1 ml-auto">{props.data.teamData.W + " - " + props.data.teamData.L}</div>
        <div className="text-2xs xs:text-xs pl-1 pr-2 mr-auto">{"(" + props.data.teamData.CCW + " - " + props.data.teamData.CCL + ")"}</div>
        <div className="ml-4 text-2xs sm:text-xs pl-2 mx-auto">{props.data.teamData.teamID === props.data.lastWeekData.HomeTeam ? props.data.lastWeekData.HomeWL + " " + props.data.lastWeekData.HomeScore + "-" + props.data.lastWeekData.AwayScore + " v " + props.data.lastWeekData.awayTeamStats.teamInfo.TeamName : props.data.lastWeekData.AwayWL + " " + props.data.lastWeekData.AwayScore + "-" + props.data.lastWeekData.HomeScore + " @ " + props.data.lastWeekData.homeTeamStats.teamInfo.TeamName}</div>
      </div>
    </div>
  )
}


function MatchupScroller(props) {
  return (
    <div className='flex flex-row overflow-auto whitespace-nowrap mt-2 flex-nowrap'>
      <div className='mr-12 shrink-0'>
        <div className='font-oswald text-left px-4 font-bold text-base'>Week {props.data.currentWeek.WeekNum}</div>
        <div className="flex flex-row">
          {props.data.schedule &&
            props.data.schedule
              .filter(obj => obj.Season === props.data.currentWeek.Season)
              .filter(obj => obj.WeekNum === props.data.currentWeek.WeekNum)
              .sort((a,b) => a.MatchupNum - b.MatchupNum)
              .map((obj, i) => <ScrollerItem data={obj} key={i} />)}
        </div>
      </div>
      <div className='mr-12 shrink-0'>
        <div className='font-oswald text-left px-4 font-bold text-base'>Week {props.data.currentWeek.WeekNum - 1}</div>
        <div className="flex flex-row">
          {props.data.schedule &&
            props.data.schedule
              .filter(obj => obj.Season === props.data.currentWeek.Season)
              .filter(obj => obj.WeekNum === String(props.data.currentWeek.WeekNum - 1))
              .sort((a,b) => a.MatchupNum - b.MatchupNum)
              .map((obj, i) => <ScrollerItem data={obj} key={i} />)}
        </div>
      </div>
      <div className=''>
        <div className='font-oswald text-left px-4 font-bold text-base'>Week {props.data.currentWeek.WeekNum - 2}</div>
        <div className="flex flex-row">
          {props.data.schedule &&
            props.data.schedule
              .filter(obj => obj.Season === props.data.currentWeek.Season)
              .filter(obj => obj.WeekNum === String(props.data.currentWeek.WeekNum - 2))
              .sort((a,b) => a.MatchupNum - b.MatchupNum)
              .map((obj, i) => <ScrollerItem data={obj} key={i} />)}
        </div>
      </div>
    </div>
  )
}
function ScrollerItem(props) {
  return (
    <div className='flex flex-col m-2 px-1 items-center bg-gray-100 shadow-emboss rounded-2xl shrink-0'>
      <Link to={"/matchup/" + props.data.id}>
        <div className={`flex p-1 ${props.data.AwayWL === "W" ? 'font-bold text-emerald-800' : (props.data.AwayWL === "L" ? 'text-rose-800' : '')}`}>
          {props.data.AwayRank <= 8 ? <div className='mx-auto px-1 text-xs xs:text-sm items-start font-bold'>#{props.data.AwayRank}</div> : <div className="pl-5"></div>}
          <img className='w-8 my-1 mx-1' src={props.data.awayTeamStats ? props.data.awayTeamStats.teamInfo.LogoURL : ''} alt='Away Team Logo' />
          <div className='mx-auto px-1 text-sm xs:text-base my-auto'>{props.data.AwayScore}</div>
        </div>
        <div className={`flex p-1 ${props.data.HomeWL === "W" ? 'font-bold text-emerald-800' : (props.data.HomeWL === "L" ? 'text-rose-800' : '')}`}>
          {props.data.HomeRank <= 8 ? <div className='mx-auto px-1 text-xs xs:text-sm items-start font-bold'>#{props.data.HomeRank}</div> : <div className="pl-5"></div>}
          <img className='w-8 my-1 mx-1' src={props.data.homeTeamStats && props.data.homeTeamStats.teamInfo.LogoURL} alt='Home Team Logo' />
          <div className='mx-auto px-1 text-sm xs:text-base my-auto'>{props.data.HomeScore}</div>
        </div>
      </Link>
    </div>
  )
}