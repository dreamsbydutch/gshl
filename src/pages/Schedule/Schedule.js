import React, { useState } from 'react'
import PageNavbar from '../../components/Navbar/PageNavbar'
import WeeklySchedule from './WeeklySchedule/WeeklySchedule'
import TeamSchedule from './TeamSchedule/TeamSchedule'
import { currentSeason, SeasonListNavData } from '../../utils/constants'
import './Schedule.css'

function Schedule() {
  const [schedType, setSchedType] = useState('Week')
  const [seasonID, setSeasonID] = useState(currentSeason.key)

  const pageNavData = [
    {
      'content': 'Team Schedule',
      'onClick': () => setSchedType('Team'),
      'key': 'Team'
    },
    {
      'content': 'Weekly Schedule',
      'onClick': () => setSchedType('Week'),
      'key': 'Week'
    }
  ]

  return (
    <div className='schedule-container'>
      <PageNavbar data={pageNavData} setter={setSchedType} activeKey={schedType} />
      <PageNavbar data={SeasonListNavData} setter={setSeasonID} activeKey={seasonID} />
      {schedType === 'Week' ? <WeeklySchedule toolbar={true} season={seasonID} /> : <></>}
      {schedType === 'Team' ? <TeamSchedule toolbar={true} season={seasonID} /> : <></>}
    </div>
  )
}

export default Schedule