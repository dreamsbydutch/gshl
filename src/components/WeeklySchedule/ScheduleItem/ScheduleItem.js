import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import MatchupStats from './MatchupStats/MatchupStats'
import './ScheduleItem.css'

function ScheduleItem(props) {
  const [showInfo, setShowInfo] = useState(false)
  return (
    <div className='matchup-container'>
      <Row onClick={() => setShowInfo(!showInfo)}>
        <Col className='teamLogo col-2'><img src={props.data.AwayTeam.LogoURL} alt='Away Team Logo'/></Col>
        <Col className={'teamName ' + props.data.AwayTeam.Conference+' '+props.data.AwayWL}>{props.data.AwayTeam.TeamName}</Col>
        <Col className='col-2 score'>{props.data.HomeScore || props.data.AwayScore ? props.data.AwayScore + ' - ' + props.data.HomeScore : '@'}</Col>
        <Col className='teamLogo col-2'><img src={props.data.HomeTeam.LogoURL} alt='Home Team Logo'/></Col>
        <Col className={'teamName ' + props.data.HomeTeam.Conference+' '+props.data.HomeWL}>{props.data.HomeTeam.TeamName}</Col>
      </Row>
      <Row className='matchup-stats' style={showInfo ? {display:'block'} : {display: 'none'}}>
        <MatchupStats data={props.data} />
      </Row>
    </div>
  )
}

export default ScheduleItem