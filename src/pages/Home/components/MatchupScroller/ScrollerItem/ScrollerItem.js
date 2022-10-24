import React from 'react'
import './ScrollerItem.css'

function ScrollerItem(props) {
  return (
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
  )
}

export default ScrollerItem