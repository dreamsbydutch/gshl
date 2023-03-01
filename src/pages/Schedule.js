import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { queryFunc } from '../utils/fetchData'
import { ScheduleToggleNavbar, SeasonToggleNavbar } from '../components/PageNavbar'
import WeeklySchedule from '../components/WeeklySchedule'
import TeamSchedule from '../components/TeamSchedule'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorPage from '../components/ErrorPage'

export default function Schedule() {
  
const [schedType, setSchedType] = useState('Week')
const [seasonID, setSeasonID] = useState(null)
  
  let date = new Date()
  const hour = date.getHours()
  date = new Date(date.getFullYear(), date.getMonth(), hour < 5 ? date.getDate() - 1 : date.getDate())
  const season = String((date.getMonth() < 8 ? date.getFullYear() : date.getFullYear() + 1))

  const weeks = useQuery([['Schedule', 'CurrentWeek'], 'MainInput', 'Weeks'], queryFunc)
  const scheduleData = useQuery([['Schedule', 'Schedule'], 'MainInput', 'Schedule'], queryFunc)
  const gshlTeamData = useQuery([['Schedule', 'GSHLTeams'], 'MainInput', 'GSHLTeams'], queryFunc)

  const currentWeek = weeks.data?.filter(obj => (obj.Season === season) && ((new Date(obj.StartDate + ' 00:00:00')) <= date) && ((new Date(obj.EndDate + ' 00:00:00')) >= date))[0]
  const schedule = scheduleData.data?.filter(obj => obj.Season === season)
  const gshlTeams = gshlTeamData.data?.filter(obj => obj[season])

  useEffect(() => {
    setSeasonID(currentWeek?.Season)
  }, [currentWeek?.Season])
  
  
  if (weeks.isLoading || scheduleData.isLoading) { return <LoadingSpinner /> }
  if (weeks.error || scheduleData.error || weeks.data?.error || scheduleData.data?.error) { return <ErrorPage /> }
  return (
    <div className='my-3 mx-2'>
      <SeasonToggleNavbar setter={setSeasonID} activeKey={seasonID} />
      <ScheduleToggleNavbar setter={setSchedType} activeKey={schedType} />
      {schedType === 'Week' ? <WeeklySchedule {...{currentWeek, schedule, gshlTeams, 'toolbar':true, 'season':seasonID}} /> : <TeamSchedule {...{currentWeek, schedule, gshlTeams, 'toolbar':true, 'season':seasonID}} />}
    </div>
  )
}
