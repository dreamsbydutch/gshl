import React, { useState } from 'react'
import { Button, ButtonGroup, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useFetchSchedule } from '../../hooks/schedule'
import ErrorPage from '../../pages/ErrorPage/ErrorPage'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import ScheduleItem from './ScheduleItem/ScheduleItem'
import './WeeklySchedule.css'

function Schedule() {
  const [weekID, setWeekID] = useState()
  const scheduleData = useFetchSchedule('2021-22')
  if (scheduleData.loading) { return <LoadingSpinner /> }
  if (scheduleData.error) { return <ErrorPage /> }
  console.log(weekID)
  return (
    <Container fluid>
        <>
          <div>
            <ButtonGroup className='season-listing-btn-group btn-group'>
              <Button variant="Secondary" onClick={() => setWeekID(1)} >1</Button>
              <Button variant="Secondary" onClick={() => setWeekID(2)} >2</Button>
              <Button variant="Secondary" onClick={() => setWeekID(3)} >3</Button>
              <Button variant="Secondary" onClick={() => setWeekID(4)} >4</Button>
              <Button variant="Secondary" onClick={() => setWeekID(5)} >5</Button>
              <Button variant="Secondary" onClick={() => setWeekID(6)} >6</Button>
              <Button variant="Secondary" onClick={() => setWeekID(7)} >7</Button>
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
          {scheduleData.data.filter(obj => obj.HomeTeam && obj.AwayTeam).filter(obj => obj.WeekNum === weekID).map((obj, i) => <ScheduleItem data={obj} key={i} />)}
        </>
    </Container>
  )
}

export default Schedule