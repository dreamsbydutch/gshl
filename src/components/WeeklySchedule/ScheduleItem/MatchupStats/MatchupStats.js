import React from 'react'
import { Col, Row } from 'react-bootstrap'
// import { Link } from 'react-router-dom';
import './MatchupStats.css'

function MatchupStats(props) {
  return (
    <>
      {/* <Row as={Link} to="/matchup/1" className="more-stats-button">Full Stats</Row> */}
      <Row className="stat-row">
        <Col className={+props.data.AwayStats.G>+props.data.HomeStats.G ? "team-stat-leader" : "team-stat"}>{+props.data.AwayStats.G}</Col>
        <Col className="col-3 stat-label">Goals</Col>
        <Col className={+props.data.AwayStats.G<+props.data.HomeStats.G ? "team-stat-leader" : "team-stat"}>{+props.data.HomeStats.G}</Col>
      </Row>
      <Row className="stat-row">
        <Col className={+props.data.AwayStats.A>+props.data.HomeStats.A ? "team-stat-leader" : "team-stat"}>{+props.data.AwayStats.A}</Col>
        <Col className="col-3 stat-label">Assists</Col>
        <Col className={+props.data.AwayStats.A<+props.data.HomeStats.A ? "team-stat-leader" : "team-stat"}>{+props.data.HomeStats.A}</Col>
      </Row>
      <Row className="stat-row">
        <Col className={+props.data.AwayStats.P>+props.data.HomeStats.P ? "team-stat-leader" : "team-stat"}>{+props.data.AwayStats.P}</Col>
        <Col className="col-3 stat-label">Points</Col>
        <Col className={+props.data.AwayStats.P<+props.data.HomeStats.P ? "team-stat-leader" : "team-stat"}>{+props.data.HomeStats.P}</Col>
      </Row>
      <Row className="stat-row">
        <Col className={+props.data.AwayStats.PPP>+props.data.HomeStats.PPP ? "team-stat-leader" : "team-stat"}>{+props.data.AwayStats.PPP}</Col>
        <Col className="col-3 stat-label">PPP</Col>
        <Col className={+props.data.AwayStats.PPP<+props.data.HomeStats.PPP ? "team-stat-leader" : "team-stat"}>{+props.data.HomeStats.PPP}</Col>
      </Row>
      <Row className="stat-row">
        <Col className={+props.data.AwayStats.SOG>+props.data.HomeStats.SOG ? "team-stat-leader" : "team-stat"}>{+props.data.AwayStats.SOG}</Col>
        <Col className="col-3 stat-label">Shots</Col>
        <Col className={+props.data.AwayStats.SOG<+props.data.HomeStats.SOG ? "team-stat-leader" : "team-stat"}>{+props.data.HomeStats.SOG}</Col>
      </Row>
      <Row className="stat-row">
        <Col className={+props.data.AwayStats.HIT>+props.data.HomeStats.HIT ? "team-stat-leader" : "team-stat"}>{+props.data.AwayStats.HIT}</Col>
        <Col className="col-3 stat-label">Hits</Col>
        <Col className={+props.data.AwayStats.HIT<+props.data.HomeStats.HIT ? "team-stat-leader" : "team-stat"}>{+props.data.HomeStats.HIT}</Col>
      </Row>
      <Row className="stat-row">
        <Col className={+props.data.AwayStats.BLK>+props.data.HomeStats.BLK ? "team-stat-leader" : "team-stat"}>{+props.data.AwayStats.BLK}</Col>
        <Col className="col-3 stat-label">Blocks</Col>
        <Col className={+props.data.AwayStats.BLK<+props.data.HomeStats.BLK ? "team-stat-leader" : "team-stat"}>{+props.data.HomeStats.BLK}</Col>
      </Row>
      <Row className="stat-row">
        <Col className={+props.data.AwayStats.W>+props.data.HomeStats.W ? "team-stat-leader" : "team-stat"}>{+props.data.AwayStats.W}</Col>
        <Col className="col-3 stat-label">Wins</Col>
        <Col className={+props.data.AwayStats.W<+props.data.HomeStats.W ? "team-stat-leader" : "team-stat"}>{+props.data.HomeStats.W}</Col>
      </Row>
      <Row className="stat-row">
        <Col className={+props.data.AwayStats.GAA<+props.data.HomeStats.GAA ? "team-stat-leader" : "team-stat"}>{Math.round(+props.data.AwayStats.GAA*100)/100}</Col>
        <Col className="col-3 stat-label">GAA</Col>
        <Col className={+props.data.AwayStats.GAA>+props.data.HomeStats.GAA ? "team-stat-leader" : "team-stat"}>{Math.round(+props.data.HomeStats.GAA*100)/100}</Col>
      </Row>
      <Row className="stat-row">
        <Col className={+props.data.AwayStats.SVP>+props.data.HomeStats.SVP ? "team-stat-leader" : "team-stat"}>{Math.round(+props.data.AwayStats.SVP*1000)/1000}</Col>
        <Col className="col-3 stat-label">Save %</Col>
        <Col className={+props.data.AwayStats.SVP<+props.data.HomeStats.SVP ? "team-stat-leader" : "team-stat"}>{Math.round(+props.data.HomeStats.SVP*1000)/1000}</Col>
      </Row>
    </>
  )
}

export default MatchupStats