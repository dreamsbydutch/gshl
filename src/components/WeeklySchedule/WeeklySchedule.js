import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useFetchSchedule } from '../../hooks/schedule'
import ErrorPage from '../../pages/ErrorPage/ErrorPage'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import ScheduleItem from './ScheduleItem/ScheduleItem'
import './WeeklySchedule.css'
import WeeksToolbar from './WeeksToolbar/WeeksToolbar'

function WeeklySchedule(props) {
  const [weekID, setWeekID] = useState(24)
  const scheduleData = useFetchSchedule('2021-22')
  if (scheduleData.loading) { return <LoadingSpinner /> }
  if (scheduleData.error) { return <ErrorPage /> }

  const weeksList = [
    {'type': 'RS', 'data':[1,2,3,4,5,6,7,8]},
    {'type': 'RS', 'data':[9,10,11,12,13,14,15]},
    {'type': 'RS', 'data':[16,17,18,19,20,21,22]},
    {'type': 'PO', 'data':['1st Rd','Conf. Finals','Finals']}
  ]

  return (
    <Container fluid>
        <>
          {props.toolbar && <WeeksToolbar variant={{'RS':'outline-secondary','PO':'outline-warning'}} data={weeksList} setter={setWeekID} active={weekID} />}
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

export default WeeklySchedule