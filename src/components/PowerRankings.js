import React from 'react'
import { useQuery } from 'react-query'
import { queryFunc } from '../utils/fetchData'
import LoadingSpinner from './LoadingSpinner'
import ErrorPage from './ErrorPage'


export default function PowerRankings() {

    let date = new Date()
    const hour = date.getHours()
    date = new Date(date.getFullYear(), date.getMonth(), hour < 5 ? date.getDate() - 1 : date.getDate())
    const season = String((date.getMonth() < 8 ? date.getFullYear() : date.getFullYear() + 1))

    const weeks = useQuery([['PowerRankings', 'CurrentWeek'], 'MainInput', 'Weeks'], queryFunc)
    const gshlTeams = useQuery([['PowerRankings', 'GSHLTeams'], 'MainInput', 'GSHLTeams'], queryFunc)
    const standingsData = useQuery([['PowerRankings', 'Standings'], season + 'TeamData', 'Standings'], queryFunc)
    const scheduleData = useQuery([['PowerRankings', 'Schedule'], 'MainInput', 'Schedule'], queryFunc)

    const currentWeek = weeks.data?.filter(obj => (obj.Season === season) && ((new Date(obj.StartDate + ' 00:00:00')) <= date) && ((new Date(obj.EndDate + ' 00:00:00')) >= date))[0]
    const teamInfo = gshlTeams.data?.filter(obj => obj[season])
    const standings = standingsData.data
    const schedule = scheduleData.data?.filter(obj => obj.Season === season)
    
    if (weeks.isLoading || gshlTeams.isLoading || scheduleData.isLoading || standingsData.isLoading) { return <LoadingSpinner /> }
    if (weeks.error || gshlTeams.error || scheduleData.error || standingsData.error || weeks.data?.error || gshlTeams.data?.error || scheduleData.data?.error || standingsData.data?.error) { return <ErrorPage /> }
    return (
        <div className="mx-3 max-w-3xl my-8 py-4 px-1 rounded-2xl bg-gray-100 hover:text-gray-800 shadow-md">
            <div className="font-oswald text-4xl font-extrabold text-center mt-2 mb-2">GSHL Power Rankings</div>
            <ul className="mx-2 p-0 [&>*:last-child]:border-none">
                {standings.sort((a, b) => a.Rk - b.Rk).map(obj => <RankingItem {...{ 'teamData': obj, currentWeek, schedule, teamInfo, season }} />)}
            </ul>
        </div>
    )
}




function RankingItem(props) {
    if (!props.teamData || !props.currentWeek || !props.schedule || !props.teamInfo || !props.season) { return <LoadingSpinner /> }
    let lastweek = props.schedule?.filter(obj => (obj.HomeTeam === props.teamData.teamID || obj.AwayTeam === props.teamData.teamID) && obj.WeekNum === String(props.currentWeek.WeekNum - 1))[0]
    let lastWkTeam = props.teamInfo?.filter(team => team[props.season] === (props.teamData.teamID === lastweek.HomeTeam ? lastweek.AwayTeam : lastweek.HomeTeam))[0]
    let rankChange = []
    if (props.teamData.RkCh > 0) {
        rankChange = [Math.abs(props.teamData.RkCh), "RkUp"]
    } else if (props.teamData.RkCh < 0) {
        rankChange = [Math.abs(props.teamData.RkCh), "RkDn"]
    } else {
        rankChange = [Math.abs(props.teamData.RkCh), "Even"]
    }
    return (
        <li className="border-b border-gray-600 py-2.5 flex items-center" key={props.teamData.teamID}>
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