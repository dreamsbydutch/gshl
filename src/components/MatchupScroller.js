import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { queryFunc } from '../utils/fetchData'
import LoadingSpinner from './LoadingSpinner'
import ErrorPage from './ErrorPage'

export default function MatchupScroller(props) {

    let date = new Date()
    const hour = date.getHours()
    date = new Date(date.getFullYear(), date.getMonth(), hour < 5 ? date.getDate() - 1 : date.getDate())
    const season = String((date.getMonth() < 8 ? date.getFullYear() : date.getFullYear() + 1))

    const weeks = useQuery([['PowerRankings', 'CurrentWeek'], 'MainInput', 'Weeks'], queryFunc)
    const gshlTeams = useQuery([['PowerRankings', 'GSHLTeams'], 'MainInput', 'GSHLTeams'], queryFunc)
    const scheduleData = useQuery([['PowerRankings', 'Schedule'], 'MainInput', 'Schedule'], queryFunc)

    if (weeks.isLoading || gshlTeams.isLoading || scheduleData.isLoading) { return <LoadingSpinner /> }
    if (weeks.error || gshlTeams.error || scheduleData.error || weeks.data?.error || gshlTeams.data?.error || scheduleData.data?.error) { return <ErrorPage /> }

    const teamInfo = gshlTeams.data?.filter(obj => obj[season])
    const currentWeek = weeks.data?.filter(obj => (obj.Season === season) && ((new Date(obj.StartDate + ' 00:00:00')) <= date) && ((new Date(obj.EndDate + ' 00:00:00')) >= date))[0]
    const schedule = scheduleData.data?.filter(obj => obj.Season === season)


    return (
        <div className='flex flex-row overflow-auto whitespace-nowrap mt-2 flex-nowrap'>
            <div className='mr-12 shrink-0'>
                <div className='font-oswald text-left px-4 font-bold text-base'>Week {currentWeek.WeekNum}</div>
                <div className="flex flex-row">
                    {schedule &&
                        schedule
                            .filter(obj => obj.Season === season)
                            .filter(obj => obj.WeekNum === currentWeek.WeekNum)
                            .sort((a, b) => a.MatchupNum - b.MatchupNum)
                            .map((obj, i) => <ScrollerItem {...{ 'teamData': obj, 'key': i, teamInfo, season }} />)}
                </div>
            </div>
            <div className='mr-12 shrink-0'>
                <div className='font-oswald text-left px-4 font-bold text-base'>Week {currentWeek.WeekNum - 1}</div>
                <div className="flex flex-row">
                    {schedule &&
                        schedule
                            .filter(obj => obj.Season === season)
                            .filter(obj => obj.WeekNum === String(currentWeek.WeekNum - 1))
                            .sort((a, b) => a.MatchupNum - b.MatchupNum)
                            .map((obj, i) => <ScrollerItem {...{ 'teamData': obj, 'key': i, teamInfo, season }} />)}
                </div>
            </div>
            <div className=''>
                <div className='font-oswald text-left px-4 font-bold text-base'>Week {currentWeek.WeekNum - 2}</div>
                <div className="flex flex-row">
                    {schedule &&
                        schedule
                            .filter(obj => obj.Season === season)
                            .filter(obj => obj.WeekNum === String(currentWeek.WeekNum - 2))
                            .sort((a, b) => a.MatchupNum - b.MatchupNum)
                            .map((obj, i) => <ScrollerItem {...{ 'teamData': obj, 'key': i, teamInfo, season }} />)}
                </div>
            </div>
        </div>
    )
}






function ScrollerItem(props) {
    let homeTeam = props.teamInfo?.filter(obj => obj[props.season] === props.teamData.HomeTeam)[0]
    let awayTeam = props.teamInfo?.filter(obj => obj[props.season] === props.teamData.AwayTeam)[0]
    if (!props.teamData || !props.teamInfo) { return <LoadingSpinner /> }

    return (
        <div className='flex flex-col m-2 px-1 items-center bg-gray-100 shadow-emboss rounded-2xl shrink-0'>
            <Link to={"/matchup/" + props.teamData.id}>
                <div className={`flex p-1 ${props.teamData.AwayWL === "W" ? 'font-bold text-emerald-800' : (props.teamData.AwayWL === "L" ? 'text-rose-800' : '')}`}>
                    {props.teamData.AwayRank <= 8 ? <div className='mx-auto px-1 text-xs xs:text-sm items-start font-bold'>#{props.teamData.AwayRank}</div> : <div className="pl-5"></div>}
                    <img className='w-8 my-1 mx-1' src={awayTeam.LogoURL} alt='Away Team Logo' />
                    <div className='mx-auto px-1 text-sm xs:text-base my-auto'>{props.teamData.AwayScore}</div>
                </div>
                <div className={`flex p-1 ${props.teamData.HomeWL === "W" ? 'font-bold text-emerald-800' : (props.teamData.HomeWL === "L" ? 'text-rose-800' : '')}`}>
                    {props.teamData.HomeRank <= 8 ? <div className='mx-auto px-1 text-xs xs:text-sm items-start font-bold'>#{props.teamData.HomeRank}</div> : <div className="pl-5"></div>}
                    <img className='w-8 my-1 mx-1' src={homeTeam.LogoURL} alt='Home Team Logo' />
                    <div className='mx-auto px-1 text-sm xs:text-base my-auto'>{props.teamData.HomeScore}</div>
                </div>
            </Link>
        </div>
    )
}