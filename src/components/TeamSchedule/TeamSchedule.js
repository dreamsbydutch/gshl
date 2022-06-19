// import React, { useState } from 'react'
// import { Container, Row, Col } from 'react-bootstrap'
// import { useFetchSchedule } from '../../hooks/schedule'
// import ErrorPage from '../../pages/ErrorPage/ErrorPage'
// import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
// import ScheduleItem from './ScheduleItem/ScheduleItem'
// import './TeamSchedule.css'
// import TeamsToolbar from './TeamsToolbar/TeamsToolbar'

function TeamSchedule(props) {
  // const [teamID, setTeamID] = useState(1)
  // const scheduleData = useFetchSchedule('2021-22')
  // if (scheduleData.loading) { return <LoadingSpinner /> }
  // if (scheduleData.error) { return <ErrorPage /> }
  
  // return (
  //   <Container fluid>
  //       <>
  //         {props.toolbar && <TeamsToolbar variant='outline-secondary' setter={setTeamID} active={teamID} />}
  //         <Row className='schedule-header-row'>
  //           <Col>Opponent</Col>
  //           <Col className='col-3'>Score</Col>
  //         </Row>
  //         {scheduleData.data.filter(obj => obj.HomeTeam && obj.AwayTeam).filter(obj => obj.HomeTeam.id === teamID || obj.AwayTeam.id === teamID).map((obj, i) => <ScheduleItem data={obj} teamID={teamID} key={i} />)}
  //       </>
  //   </Container>
  // )
}

export default TeamSchedule