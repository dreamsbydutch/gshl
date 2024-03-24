import React from 'react'
import { useQuery } from 'react-query'
import { queryFunc } from '../utils/fetchData'
import LoadingSpinner from './LoadingSpinner'
import { useTeams, useWeeks } from '../utils/context'


export default function PowerRankings() {
    let date = new Date()
    const season = String((date.getMonth() < 8 ? date.getFullYear() : date.getFullYear() + 1))

    const weeks = useWeeks()
    const teams = useTeams()
    const standingsData = useQuery([season + 'TeamData', 'Standings'], queryFunc)
    const scheduleData = useQuery(['MainInput', 'Schedule'], queryFunc)

    const schedule = scheduleData.data?.filter(obj => obj.Season === season)
    
    if (!weeks || !teams || !schedule || !standingsData.data) { return <LoadingSpinner /> }
    return (
        <div className="mx-3 max-w-3xl my-8 py-4 px-1 rounded-2xl bg-gray-100 hover:text-gray-800 shadow-md">
            <div className="font-oswald text-4xl font-extrabold text-center mt-2 mb-2">GSHL Power Rankings</div>
            <ul className="mx-2 p-0 [&>*:last-child]:border-none">
                {standingsData.data?.sort((a, b) => a.Rk - b.Rk).map(obj => <RankingItem {...{ 'teamData': obj, 'currentWeek':weeks.currentWeek, schedule, teams }} />)}
            </ul>
        </div>
    )
}

function RankingItem(props) {
    let lastweek = props.schedule?.filter(obj => (obj.HomeTeam === props.teamData.teamID || obj.AwayTeam === props.teamData.teamID) && obj.WeekNum === String(props.currentWeek?.WeekNum - 1))[0]
    let lastWkTeam = lastweek && props.teams?.filter(team => team.id === (props.teamData.teamID === lastweek.HomeTeam ? lastweek.AwayTeam : lastweek.HomeTeam))[0]
    let rankChange = []
    if (props.teamData.RkCh > 0) {
        rankChange = [Math.abs(props.teamData.RkCh), "RkUp"]
    } else if (props.teamData.RkCh < 0) {
        rankChange = [Math.abs(props.teamData.RkCh), "RkDn"]
    } else {
        rankChange = [Math.abs(props.teamData.RkCh), "Even"]
    }
    if (!lastweek || !lastWkTeam) {return <LoadingSpinner />}
    <div className="mx-3 max-w-3xl my-8 py-4 px-1 rounded-2xl bg-gray-100 hover:text-gray-800 shadow-md">
        <div className="font-oswald text-4xl font-extrabold text-center mt-2 mb-2">GSHL Power Rankings</div>
        <ul className="mx-2 p-0 [&>*:last-child]:border-none">
            {standingsData.data?.sort((a, b) => a.Rk - b.Rk).map(obj => <RankingItem {...{ 'teamData': obj, 'currentWeek':weeks.currentWeek, schedule, teams }} />)}
        </ul>
    </div>
    return (
        <li key={props.teamData.teamID} className="border-b border-gray-600 py-2.5 flex items-center">
            <div className="font-oswald text-base xs:text-lg font-bold w-4 mx-2 flex flex-row justify-around">
                {props.teamData.Rk}
                <div className={`font-oswald pl-1 text-2xs sm:text-xs self-center ${rankChange[1] === "RkUp" ? 'text-emerald-800' : rankChange[1] === "RkDn" ? 'text-rose-800' : 'text-gray-800'}`}>
                    {rankChange[1] === "RkUp" ? '\u2191' : rankChange[1] === "RkDn" ? '\u2193' : '\u2194'}
                    {rankChange[1] === "Even" ? null : rankChange[0]}
                </div>
            </div>
            <img className="w-12 xs:w-12 mx-2" src={props.teamData.logoURL} alt={props.teamData.teamName + " Logo"} />
            <div className="flex flex-col gap-2 w-full items-center">
                <div className="font-bold text-base xs:text-lg px-2 my-auto text-center">{props.teamData.teamName}</div>
                <div className="flex flex-row items-center flex-wrap">
                    <div className="text-xs xs:text-sm pr-1 ml-auto">{props.teamData.W + " - " + props.teamData.L}</div>
                    <div className="text-2xs xs:text-xs pl-1 pr-2 mr-auto">{"(" + props.teamData.CCW + " - " + props.teamData.CCL + ")"}</div>
                    <div className="ml-4 text-2xs sm:text-xs pl-2 mx-auto">
                        {props.teamData.teamID === lastweek.HomeTeam ?
                            lastweek.HomeWL + " " + lastweek.HomeScore + "-" + lastweek.AwayScore + " v " + lastWkTeam.TeamName
                            :
                            lastweek.AwayWL + " " + lastweek.AwayScore + "-" + lastweek.HomeScore + " @ " + lastWkTeam.TeamName
                        }
                    </div>
                </div>
            </div>
        </li>
    )
}