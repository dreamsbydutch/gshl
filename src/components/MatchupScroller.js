import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { queryFunc } from '../utils/fetchData'
import { useTeams, useWeeks } from '../utils/context'
import LoadingSpinner from './LoadingSpinner'

export default function MatchupScroller() {
    let date = new Date()
    const season = String((date.getMonth() < 8 ? date.getFullYear() : date.getFullYear() + 1))

    const scheduleData = useQuery(['MainInput', 'Schedule'], queryFunc)
    const schedule = scheduleData.data?.filter(obj => obj.Season === season)
    const teams = useTeams()
    const weeks = useWeeks()

    if (!teams || !weeks || !schedule || !weeks.currentWeek) { return <LoadingSpinner /> }
    return (
        <div className='flex flex-row overflow-auto whitespace-nowrap mt-2 flex-nowrap'>
            <div className='mr-12 shrink-0'>
                <div className='font-oswald text-left px-4 font-bold text-base'>Week {weeks.currentWeek.WeekNum}</div>
                <div className="flex flex-row">
                    {schedule &&
                        schedule
                            .filter(obj => obj.Season === season && obj.WeekNum === weeks.currentWeek.WeekNum)
                            .sort((a, b) => a.MatchupNum - b.MatchupNum)
                            .map((obj, i) => <ScrollerItem {...{ 'teamData': obj, 'key': i, teams, season }} />)}
                </div>
            </div>
            <div className='mr-12 shrink-0'>
                <div className='font-oswald text-left px-4 font-bold text-base'>Week {weeks.currentWeek.WeekNum - 1}</div>
                <div className="flex flex-row">
                    {schedule &&
                        schedule
                            .filter(obj => obj.Season === season)
                            .filter(obj => obj.WeekNum === String(weeks.currentWeek.WeekNum - 1))
                            .sort((a, b) => a.MatchupNum - b.MatchupNum)
                            .map((obj, i) => <ScrollerItem {...{ 'teamData': obj, 'key': i, teams, season }} />)}
                </div>
            </div>
            <div className=''>
                <div className='font-oswald text-left px-4 font-bold text-base'>Week {weeks.currentWeek.WeekNum - 2}</div>
                <div className="flex flex-row">
                    {schedule &&
                        schedule
                            .filter(obj => obj.Season === season)
                            .filter(obj => obj.WeekNum === String(weeks.currentWeek.WeekNum - 2))
                            .sort((a, b) => a.MatchupNum - b.MatchupNum)
                            .map((obj, i) => <ScrollerItem {...{ 'teamData': obj, 'key': i, teams, season }} />)}
                </div>
            </div>
        </div>
    )
}

function ScrollerItem(props) {
    let homeTeam = props.teams?.filter(obj => obj.id === props.teamData.HomeTeam)[0]
    let awayTeam = props.teams?.filter(obj => obj.id === props.teamData.AwayTeam)[0]
    if (!props.teams || !props.teamData) { return <LoadingSpinner /> }

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