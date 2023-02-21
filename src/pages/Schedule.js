import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import { ScheduleToggleNavbar, SeasonToggleNavbar } from '../components/PageNavbar'
import WeeklySchedule from '../components/WeeklySchedule'
import TeamSchedule from '../components/TeamSchedule'
import { useSchedule } from '../utils/fetchData'

export default function Schedule(props) {
  const [schedType, setSchedType] = useState('Week')
  const [seasonID, setSeasonID] = useState(null)
  useEffect(() => {
    setSeasonID(props.currentWeek.Season)
  }, [props.currentWeek.Season])
  const scheduleData = useSchedule(seasonID)
  if (scheduleData.isLoading) { return <LoadingSpinner /> }
  if (scheduleData.isError) { return <div>Error</div> }
  const data = {
    'schedule': scheduleData.data,
    'currentWeek': props.currentWeek,
  }

  
  return (
    <div className='my-3 mx-2'>
      <SeasonToggleNavbar setter={setSeasonID} activeKey={seasonID} />
      <ScheduleToggleNavbar setter={setSchedType} activeKey={schedType} />
      {schedType === 'Week' ? <WeeklySchedule data={data} toolbar={true} season={seasonID} /> : <TeamSchedule data={data} toolbar={true} season={seasonID} />}
    </div>
  )
}
