import React, { useState } from 'react'
import { Button, ButtonGroup, Container, Row, Col } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useFetchSchedule } from '../../hooks/schedule'
import ErrorPage from '../../pages/ErrorPage/ErrorPage'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import ScheduleItem from './ScheduleItem/ScheduleItem'
import './ScheduleContainer.css'

function Schedule() {
  const { weekid } = useParams()
  const [schedType, setSchedType] = useState('Week')
  const scheduleData = useFetchSchedule('2021-22')
  if (scheduleData.loading) { return <LoadingSpinner /> }
  if (scheduleData.error) { return <ErrorPage /> }
  return (
    <Container fluid>
      <ButtonGroup>
        <Button onClick={() => setSchedType('Team')} variant="Secondary">Team Schedule</Button>
        <Button onClick={() => setSchedType('Week')} variant="Secondary" >Weekly Schedule</Button>
      </ButtonGroup>
      {schedType === 'Week' &&
        <>
          <div>
            <ButtonGroup className='season-listing-btn-group btn-group'>
              <Button as={Link} variant="Secondary" to="/schedule/1" >1</Button>
              <Button as={Link} variant="Secondary" to="/schedule/2" >2</Button>
              <Button as={Link} variant="Secondary" to="/schedule/3" >3</Button>
              <Button as={Link} variant="Secondary" to="/schedule/4" >4</Button>
              <Button as={Link} variant="Secondary" to="/schedule/5" >5</Button>
              <Button as={Link} variant="Secondary" to="/schedule/6" >6</Button>
              <Button as={Link} variant="Secondary" to="/schedule/7" >7</Button>
            </ButtonGroup>
          </div>
          <div>
            <ButtonGroup className='season-listing-btn-group btn-group'>
              <Button as={Link} variant="Secondary" to="/schedule/8" >8</Button>
              <Button as={Link} variant="Secondary" to="/schedule/9" >9</Button>
              <Button as={Link} variant="Secondary" to="/schedule/10" >10</Button>
              <Button as={Link} variant="Secondary" to="/schedule/11" >11</Button>
              <Button as={Link} variant="Secondary" to="/schedule/12" >12</Button>
              <Button as={Link} variant="Secondary" to="/schedule/13" >13</Button>
              <Button as={Link} variant="Secondary" to="/schedule/14" >14</Button>
              <Button as={Link} variant="Secondary" to="/schedule/15" >15</Button>
            </ButtonGroup>
          </div>
          <div>
            <ButtonGroup className='season-listing-btn-group btn-group'>
              <Button as={Link} variant="Secondary" to="/schedule/16" >16</Button>
              <Button as={Link} variant="Secondary" to="/schedule/17" >17</Button>
              <Button as={Link} variant="Secondary" to="/schedule/18" >18</Button>
              <Button as={Link} variant="Secondary" to="/schedule/19" >19</Button>
              <Button as={Link} variant="Secondary" to="/schedule/20" >20</Button>
              <Button as={Link} variant="Secondary" to="/schedule/21" >21</Button>
              <Button as={Link} variant="Secondary" to="/schedule/22" >22</Button>
            </ButtonGroup>
          </div>
          <div>
            <ButtonGroup className='playoff-listing-btn-group btn-group'>
              <Button as={Link} variant="Secondary" to="/schedule/23" >CSF</Button>
              <Button as={Link} variant="Secondary" to="/schedule/24" >CF</Button>
              <Button as={Link} variant="Secondary" to="/schedule/25" >F</Button>
            </ButtonGroup>
          </div>
          <Row className='schedule-header-row'>
            <Col>Away Team</Col>
            <Col className='col-2'>Score</Col>
            <Col>Home Team</Col>
          </Row>
          {scheduleData.data.filter(obj => obj.HomeTeam && obj.AwayTeam).filter(obj => obj.WeekNum === weekid).map((obj, i) => <ScheduleItem data={obj} key={i} />)}
        </>
      }
    </Container>
  )
}

export default Schedule