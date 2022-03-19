import React from 'react'
import { Row, Col } from 'react-bootstrap'
import './ScheduleItem.css'

function ScheduleItem(props) {
  return (
    <>
    <Row className='team-schedule-item'>
      <Col className={props.data.AwayTeam.id === props.teamID ? 'team-schedule-opponent '+props.data.HomeTeam.Conference : 'team-schedule-opponent '+props.data.AwayTeam.Conference}>
        {props.data.AwayTeam.id === props.teamID ? '@ '+props.data.HomeTeam.TeamName : 'v '+props.data.AwayTeam.TeamName}
      </Col>
      <Col className={props.data.AwayTeam.id === props.teamID ? 'col-1 team-schedule-WL team-schedule-'+props.data.AwayWL:'col-1 team-schedule-WL team-schedule-'+props.data.HomeWL}>
        {props.data.AwayWL && props.data.HomeWL ?
          props.data.AwayTeam.id === props.teamID ? 
            props.data.AwayWL 
            : 
            props.data.HomeWL
          :
          null}
        </Col>
      <Col className={props.data.AwayTeam.id === props.teamID ? 'col-2 team-schedule-score team-schedule-'+props.data.AwayWL:'col-2 team-schedule-score team-schedule-'+props.data.HomeWL}>
        {props.data.AwayWL && props.data.HomeWL ?
          props.data.AwayTeam.id === props.teamID ? 
            props.data.AwayScore+' - '+props.data.HomeScore 
            : 
            props.data.HomeScore+' - '+props.data.AwayScore
          :
          null}
        </Col>
    </Row>
    </>
  )
}

export default ScheduleItem