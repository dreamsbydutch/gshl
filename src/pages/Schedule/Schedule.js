import React, { useState } from 'react'
import PageNavbar from '../../components/Navbar/PageNavbar'
import WeeklySchedule from '../../components/WeeklySchedule/WeeklySchedule'
import TeamSchedule from '../../components/TeamSchedule/TeamSchedule'
import './Schedule.css'

function Schedule() {
  const [schedType, setSchedType] = useState('Week')

  const pageNavData = [
    {
      'text': 'Team Schedule',
      'onClick': () => setSchedType('Team'),
      'key': 'Team'
    },
    {
      'text': 'Weekly Schedule',
      'onClick': () => setSchedType('Week'),
      'key': 'Week'
    }
  ]

  return (
    <>
      <PageNavbar data={pageNavData} active={schedType} />
      {schedType === 'Week' ? <WeeklySchedule toolbar={true} /> : <></>}
      {schedType === 'Team' ? <TeamSchedule toolbar={true} /> : <></>}
    </>
  )
}

export default Schedule