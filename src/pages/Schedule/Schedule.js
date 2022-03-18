import React, { useState } from 'react'
import { Container, ButtonGroup, Button } from 'react-bootstrap'
import WeeklySchedule from '../../components/WeeklySchedule/WeeklySchedule'
import './Schedule.css'

function Schedule() {
  const [schedType, setSchedType] = useState('Week')
  return (
    <>
      <Container>
        <ButtonGroup>
          <Button onClick={() => setSchedType('Team')} variant="Secondary">Team Schedule</Button>
          <Button onClick={() => setSchedType('Week')} variant="Secondary" >Weekly Schedule</Button>
        </ButtonGroup>
        {schedType === 'Week' ? <WeeklySchedule /> : <></>}
      </Container>
    </>
  )
}

export default Schedule