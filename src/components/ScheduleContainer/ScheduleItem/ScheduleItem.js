import React from 'react'
import { Col, Row } from 'react-bootstrap'
import './ScheduleItem.css'

function ScheduleItem(props) {
  console.log(props.data)
  return (
    <>
      <Row className='matchup-container'>
        <Col className='teamLogo col-2'><img src={props.data.AwayTeam.LogoURL} alt='Away Team Logo'/></Col>
        <Col className={'teamName ' + props.data.AwayTeam.Conference+' '+props.data.AwayWL}>{props.data.AwayTeam.TeamName}</Col>
        <Col className='col-2 score'>{props.data.HomeScore || props.data.AwayScore ? props.data.AwayScore + ' - ' + props.data.HomeScore : '@'}</Col>
        <Col className='teamLogo col-2'><img src={props.data.HomeTeam.LogoURL} alt='Home Team Logo'/></Col>
        <Col className={'teamName ' + props.data.HomeTeam.Conference+' '+props.data.HomeWL}>{props.data.HomeTeam.TeamName}</Col>
      </Row>
    </>
  )
}

export default ScheduleItem