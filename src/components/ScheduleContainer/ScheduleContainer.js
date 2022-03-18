import React from 'react'
import { Button, ButtonGroup, Container, Dropdown } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useFetchSchedule } from '../../hooks/schedule'
import ErrorPage from '../../pages/ErrorPage/ErrorPage'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import ScheduleItem from './ScheduleItem/ScheduleItem'

function Schedule() {
  const { weekid } = useParams() 
  const scheduleData = useFetchSchedule('2021-22')
  if (scheduleData.loading) { return <LoadingSpinner /> }
  if (scheduleData.error) { return <ErrorPage /> }
  return (
    <Container fluid>
      <Dropdown as={ButtonGroup}>
        <Button as={Link} variant="Secondary" to="/schedule/21" className="leaderboard-header-live-button">Current Week</Button>
        <Dropdown.Toggle split variant="Secondary" id="dropdown-split-basic" className="leaderboard-header-tournament-toggle" />
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/schedule/1">Week 1</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/2">Week 2</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/3">Week 3</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/4">Week 4</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/5">Week 5</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/6">Week 6</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/7">Week 7</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/8">Week 8</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/9">Week 9</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/10">Week 10</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/11">Week 11</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/12">Week 12</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/13">Week 13</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/14">Week 14</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/15">Week 15</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/16">Week 16</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/17">Week 17</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/18">Week 18</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/19">Week 19</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/20">Week 20</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/21">Week 21</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/22">Week 22</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item as={Link} to="/schedule/23">Conference Semifinals</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/24">Conference Finals</Dropdown.Item>
          <Dropdown.Item as={Link} to="/schedule/25">GSHL Final</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {scheduleData.data.filter(obj => obj.HomeTeam && obj.AwayTeam).filter(obj => obj.WeekNum === weekid).map((obj,i) => <ScheduleItem data={obj} key={i}/>)}
    </Container>
  )
}

export default Schedule