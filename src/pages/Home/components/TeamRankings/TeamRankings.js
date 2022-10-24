import React from 'react'
import { currentSeason, currentWeek } from '../../../../utils/constants'
import { useSchedule, useStandings } from '../../../../utils/fetchData'
import LoadingSpinner from '../../../../utils/LoadingSpinner/LoadingSpinner'
import RankingItem from './RankingItem/RankingItem'
import './TeamRankings.css'

function TeamRankings() {
    const standings = useStandings(currentSeason.key)
    const schedule = useSchedule(currentSeason.key)

    if (standings.isLoading || schedule.isLoading) { return <LoadingSpinner /> }
    standings.data.sort((a, b) => a.Rk - b.Rk)
    return (
        <>
            <div className="ranking-header">GSHL Power Rankings</div>
            <ul className="team-rankings">
                {standings.data.map(obj => {
                    var output = schedule.data.filter(schedItem => (schedItem.HomeTeam === obj.teamID || schedItem.AwayTeam === obj.teamID) && schedItem.WeekNum === String(currentWeek - 1))[0]
                    var rankChange = []
                    if (obj.RkCh > 0) {
                        rankChange = [Math.abs(obj.RkCh), "RkUp"]
                    } else if (obj.RkCh < 0) {
                        rankChange = [Math.abs(obj.RkCh), "RkDn"]
                    } else {
                        rankChange = [Math.abs(obj.RkCh), "Even"]
                    }
                    return (
                        <li className="team-ranking-slot" key={obj.teamID}>
                            <div className="team-ranking-rank">
                                {obj.Rk}
                                <div className={"team-ranking-rankCh " + rankChange[1]}>
                                    {rankChange[1] === "RkUp" ? '\u2191' : rankChange[1] === "RkDn" ? '\u2193' : '\u2194'}
                                    {rankChange[1] === "Even" ? null : rankChange[0]}
                                </div>
                            </div>
                            <img className="team-ranking-teamLogo" src={obj.logoURL} alt={obj.teamName + " Logo"} />
                            <RankingItem data={{ 'teamData': obj, 'lastWeekData': output }} />
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default TeamRankings