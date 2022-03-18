import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import PageNavbar from '../../components/Navbar/PageNavbar'
import WeeklySchedule from '../../components/WeeklySchedule/WeeklySchedule'
import './Schedule.css'

function Schedule() {
  const [schedType, setSchedType] = useState('Week')

  const pageNavData = [
    {
      'text': 'Team Schedule',
      'onClick': () => setSchedType('Team')
    },
    {
      'text': 'Weekly Schedule',
      'onClick': () => setSchedType('Week')
    }
  ]

  return (
    <>
      <Container>
        <PageNavbar data={pageNavData} active={schedType} />
        {schedType === 'Week' ? <WeeklySchedule /> : <></>}
      </Container>
    </>
  )
}

export default Schedule