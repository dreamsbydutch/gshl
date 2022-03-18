import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useFetchSchedule } from '../../hooks/schedule'
import ErrorPage from '../../pages/ErrorPage/ErrorPage'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import ScheduleItem from './ScheduleItem/ScheduleItem'
import './WeeklySchedule.css'
import WeeksToolbar from './WeeksToolbar/WeeksToolbar'

function Schedule() {
  const [weekID, setWeekID] = useState(21)
  const scheduleData = useFetchSchedule('2021-22')
  if (scheduleData.loading) { return <LoadingSpinner /> }
  if (scheduleData.error) { return <ErrorPage /> }
  console.log(weekID)
  return (
    <Container fluid>
        <>
          <WeeksToolbar state={ {'data': weekID,'setter': setWeekID()} } />
          <Row className='schedule-header-row'>
            <Col>Away Team</Col>
            <Col className='col-2'>Score</Col>
            <Col>Home Team</Col>
          </Row>
          {scheduleData.data.filter(obj => obj.HomeTeam && obj.AwayTeam).filter(obj => +obj.WeekNum === weekID).map((obj, i) => <ScheduleItem data={obj} key={i} />)}
        </>
    </Container>
  )
}

export default Schedule