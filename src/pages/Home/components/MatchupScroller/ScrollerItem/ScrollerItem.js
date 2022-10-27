import React from 'react'
import { Link } from 'react-router-dom'
import './ScrollerItem.css'

function ScrollerItem(props) {
  return (
    <Link to={"/matchup/" + props.data.id}>
      <div className='scroller-container'>
        <div className={'teaminfo ' + props.data.AwayWL}>
          <img src={props.data.AwayTeamData && props.data.AwayTeamData.LogoURL} alt='Away Team Logo' />
          {props.data.AwayScore}
        </div>
        <div className={'teaminfo ' + props.data.HomeWL}>
          <img src={props.data.HomeTeamData && props.data.HomeTeamData.LogoURL} alt='Home Team Logo' />
          {props.data.HomeScore}
        </div>
      </div>
    </Link>
  )
}

export default ScrollerItem