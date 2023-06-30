import React from 'react'
import { useQuery } from 'react-query'
import LoadingSpinner from '../components/LoadingSpinner'
import { queryFunc } from '../utils/fetchData'
import { formatDate } from '../utils/utils'
import { useTeams, useWeeks } from '../utils/context'

export default function MissedStarts() {
    const weeks = useWeeks()
    const teams = useTeams()
  
    const playerDaysData = useQuery([weeks.currentWeek?.Season + 'PlayerData', 'Days'], queryFunc, { enabled: !!weeks.currentWeek })
    let yesterday = new Date()
    yesterday = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getHours() < 5 ? yesterday.getDate() - 2 : yesterday.getDate() - 1)
    const missedStarts = playerDaysData.data?.filter(obj => obj.Date === formatDate(yesterday) && obj.MS === '1').sort((a, b) => b.Rating - a.Rating)
  
    if (missedStarts?.length === 0) { return <div></div> }
    if (!missedStarts) { return <LoadingSpinner /> }
    return (
      <div className="bg-rose-100 text-rose-900 mx-3 my-4 py-2 rounded-xl shadow-md font-varela">
        <div className="text-center py-1 text-2xl font-bold">{`${yesterday.toLocaleDateString('en-CA', { month: "long", day: "numeric", })}${addSuffix(yesterday.getDate())} Missed Starts`}</div>
        {teams?.map(team => {
          const teamMissedStarts = missedStarts?.filter(a => +a.gshlTeam === +team[weeks.currentWeek.Season])
          if (teamMissedStarts?.length === 0) { return <></> }
          return (
            <div key={team[weeks.currentWeek?.Season]} className='px-3 py-1 flex items-center justify-center text-lg border-t border-rose-800'>
              <img className="w-12 xs:w-12 mx-2" src={team.LogoURL} alt={team.teamName + " Logo"} />
              <div className='px-3 py-1 flex flex-col items-center justify-center text-lg'>
                {teamMissedStarts?.map(b => {
                  return (
                    <span key={b.PlayerName} className={b.nhlPos === 'G' ? 'opacity-50' : ''}>{b.PlayerName}, {b.nhlPos}</span>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
  
function addSuffix(rank) {
  let suffix;
  if (rank % 100 === 11 || rank % 100 === 12 || rank % 100 === 13) {
    suffix = "th";
  } else if (rank % 10 === 1) {
    suffix = "st";
  } else if (rank % 10 === 2) {
    suffix = "nd";
  } else if (rank % 10 === 3) {
    suffix = "rd";
  } else {
    suffix = "th";
  }
  return suffix;
}